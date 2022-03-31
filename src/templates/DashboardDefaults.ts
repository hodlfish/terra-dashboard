export const template = {
    "id": "dashboard-terra-template",
    "version": "v0.1",
    "name": "Terra Overview",
    "dashboard": [
        {
            "id": "a52e6d51-c989-4e6e-9a76-8b191e0efa79",
            "type": "LunaPrice",
            "settings": {
                "name": "Luna Price",
                "refreshRate": 30,
                "decimals": 2
            }
        },
        {
            "id": "5ce1f65b-d882-480d-8729-7f268b5a93fe",
            "type": "TerraSwap",
            "settings": {
                "flipRatio": true,
                "refreshRate": 30,
                "decimals": 2,
                "contractAddr": "terra1tndcaqxkpc5ce9qee5ggqf430mr2z3pefe5wj6"
            }
        },
        {
            "id": "14517b02-897d-4ded-b385-684cb830b829",
            "type": "NativeTokenSupply",
            "settings": {
                "name": "Native Token Supply",
                "denom": "uusd",
                "decimals": 2
            }
        },
        {
            "id": "0b226622-8fd7-444b-b47f-6e96dcefc1e9",
            "type": "TerraProposals",
            "settings": {
                "name": "Terra Proposals (Passed)",
                "filter": "Passed"
            }
        },
        {
            "id": "36517847-4837-4590-93be-b0b1caaf6068",
            "type": "AnchorPrice",
            "settings": {
                "name": "Anchor Price",
                "decimals": 2
            }
        },
        {
            "id": "6cc3f6c5-e3e3-44b2-9aa6-48b0f6957657",
            "type": "AnchorTotalDeposits",
            "settings": {
                "name": "Anchor Deposits",
                "timeSpan": 365
            }
        },
        {
            "id": "6be61d86-ae56-430c-8bdd-592eed3f0e09",
            "type": "AnchorProposals",
            "settings": {
                "name": "Anchor Proposals (Executed)",
                "filter": "executed",
                "limit": 30
            }
        },
        {
            "id": "0f9ce437-418b-4b4e-925f-db501fac59be",
            "type": "MirrorPrice",
            "settings": {
                "name": "Mirror Price",
                "decimals": 2
            }
        },
        {
            "id": "7529f505-ba65-4755-b4e8-4770ffd690e7",
            "type": "MirrorAssets",
            "settings": {
                "name": "Mirror Assets",
                "sortBy": "Long APR"
            }
        },
        {
            "id": "a93a44c1-5e7d-4c40-b22b-439bbb808baa",
            "type": "MirrorProposals",
            "settings": {
                "name": "Mirror Proposals (Passed)",
                "filter": "passed",
                "limit": 30
            }
        }
    ]
}
