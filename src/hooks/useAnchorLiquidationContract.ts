import useTerraLCDClient from "./useTerraLCDClient";
  
export interface BidPool {
    sum_snapshot: string,
    product_snapshot: string,
    total_bid_amount: string,
    premium_rate: string,
    current_epoch: string,
    current_scale: string
}

export interface BidPoolsByCollateralResponse {
    bid_pools: BidPool[]
}

export interface Bid {
    idx: string,
    collateral_token: string,
    premium_slot: number,
    bidder: string,
    amount: string,
    product_snapshot: string,
    sum_snapshot: string,
    pending_liquidated_collateral: string,
    wait_end: string | null,
    epoch_snapshot: string,
    scale_snapshot: string
}

export interface GetBidsByUserResponse {
    bids: Bid[]
}

export const contractAddress = 'terra1e25zllgag7j9xsun3me4stnye2pcg66234je3u';

export const useAnchorLiquidationContract = () => {
    const {lcdClient} = useTerraLCDClient();

    function _query<T>(queryMsg: any) {
        return lcdClient.wasm.contractQuery<T>(contractAddress, queryMsg);
    }

    function getBidPoolsByCollateral(collateralTokenContract: string, limit = 31): Promise<BidPoolsByCollateralResponse> {
        return _query<BidPoolsByCollateralResponse>({
            bid_pools_by_collateral: {
                collateral_token: collateralTokenContract,
                limit: limit
            }
        });
    }

    // TODO: Queries for bids are limited to `limit`.
    //       Users with more than the `limit` may require an additional query.
    function getBidsByUser(walletAddress: string, collateralTokenContract: string, startAfter = '0', limit = 31): Promise<GetBidsByUserResponse> {
        console.log(walletAddress)
        return _query<GetBidsByUserResponse>({
            bids_by_user: {
                collateral_token: collateralTokenContract,
                bidder: walletAddress,
                start_after: startAfter,
                limit: limit 
            }
        })
    }

    function getFilledBidsPendingClaimAmount(walletAddress: string, collateralTokenContract: string): Promise<number> {
        return getBidsByUser(walletAddress, collateralTokenContract).then(bidsResponse => {
            let liquidationCollateral = 0;
            bidsResponse.bids.forEach(bid => {
                liquidationCollateral += parseInt(bid.pending_liquidated_collateral)
            });
            return liquidationCollateral;
        }).catch(() => {
            return 0;
        })
    }

    function getPendingBids(walletAddress: string, collateralTokenContract: string): Promise<Bid[]> {
        return getBidsByUser(walletAddress, collateralTokenContract).then(bidsResponse => {
            const currentTimestamp = Math.floor(new Date().getTime() / 1000)
            const pendingBids = [] as Bid[];
            bidsResponse.bids.forEach(bid => {
                if (bid.wait_end) {
                    const bidWaitEnd = parseInt(bid.wait_end);
                    if (currentTimestamp > bidWaitEnd) {
                        pendingBids.push(bid)
                    }
                }
            });
            return pendingBids;
        }).catch(() => {
            return [];
        })
    }

    return {
        getBidPoolsByCollateral,
        getBidsByUser,
        getFilledBidsPendingClaimAmount,
        getPendingBids
    };
};
