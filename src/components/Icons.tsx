function Icons() {
    return <svg xmlns="http://www.w3.org/2000/svg" style={{height: 0, width: 0, position: 'absolute', visibility: 'hidden'}}>
        <defs>
            <symbol id="hamburger" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="3" width="28" height="6"/>
                <rect x="2" y="23" width="28" height="6"/>
                <rect x="2" y="13" width="28" height="6"/>
            </symbol>
            <symbol id="gear" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M24 13.616v-3.232c-1.651-.587-2.694-.752-3.219-2.019v-.001c-.527-1.271.1-2.134.847-3.707l-2.285-2.285c-1.561.742-2.433 1.375-3.707.847h-.001c-1.269-.526-1.435-1.576-2.019-3.219h-3.232c-.582 1.635-.749 2.692-2.019 3.219h-.001c-1.271.528-2.132-.098-3.707-.847l-2.285 2.285c.745 1.568 1.375 2.434.847 3.707-.527 1.271-1.584 1.438-3.219 2.02v3.232c1.632.58 2.692.749 3.219 2.019.53 1.282-.114 2.166-.847 3.707l2.285 2.286c1.562-.743 2.434-1.375 3.707-.847h.001c1.27.526 1.436 1.579 2.019 3.219h3.232c.582-1.636.75-2.69 2.027-3.222h.001c1.262-.524 2.12.101 3.698.851l2.285-2.286c-.744-1.563-1.375-2.433-.848-3.706.527-1.271 1.588-1.44 3.221-2.021zm-12 2.384c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z"/>
            </symbol>
            <symbol id="empty-color" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="right-half" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFF"/>
                        <stop offset="50%" stopColor="#FFF"/>
                        <stop offset="50%" stopColor="#BBB"/>
                        <stop offset="100%" stopColor="#BBB"/>
                    </linearGradient>
                </defs>
                <circle cx="32" cy="32" r="32" fill="url(#right-half)"/>
            </symbol>
            <symbol id="close" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.82843 1.17157C5.26633 -0.390524 2.73367 -0.390524 1.17157 1.17157C-0.390524 2.73367 -0.390524 5.26633 1.17157 6.82843L6.82843 1.17157ZM33.1716 38.8284C34.7337 40.3905 37.2663 40.3905 38.8284 38.8284C40.3905 37.2663 40.3905 34.7337 38.8284 33.1716L33.1716 38.8284ZM38.8284 6.82843C40.3905 5.26633 40.3905 2.73367 38.8284 1.17157C37.2663 -0.390524 34.7337 -0.390524 33.1716 1.17157L38.8284 6.82843ZM1.17157 33.1716C-0.390524 34.7337 -0.390524 37.2663 1.17157 38.8284C2.73367 40.3905 5.26633 40.3905 6.82843 38.8284L1.17157 33.1716ZM1.17157 6.82843L17.1716 22.8284L22.8284 17.1716L6.82843 1.17157L1.17157 6.82843ZM17.1716 22.8284L33.1716 38.8284L38.8284 33.1716L22.8284 17.1716L17.1716 22.8284ZM22.8284 22.8284L38.8284 6.82843L33.1716 1.17157L17.1716 17.1716L22.8284 22.8284ZM17.1716 17.1716L1.17157 33.1716L6.82843 38.8284L22.8284 22.8284L17.1716 17.1716Z"/>
            </symbol>
            <symbol id="wallet" fill="#dcdcdc" viewBox="0 0 66 64" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.92233 0C0 3.1576e-08 7.83143e-06 0 0 1.92V62.08C-3.16062e-08 64 0 64 1.92233 64H62.1553C64.0777 64 64.0777 64 64.0777 62.08V49.28H36.5243C34.3456 49.28 34.2816 49.28 34.2816 47.04V16.96C34.2816 14.784 34.2816 14.72 36.5243 14.72H64.0777V1.92C64.0777 0 64.0777 0 62.1553 0H1.92233Z"/>
                <path d="M38 19.68C38 18 38 18 39.7684 18H64.2316C66 18 66 18 66 19.68V44.32C66 46 66 46 64.2316 46H39.7684C38 46 38 46 38 44.32V19.68Z"/>
            </symbol>
            <symbol id="trash" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M8 30H24L26 8.22222H6L8 30ZM15 10.2963V27.9259H17V10.2963H15ZM10 27.9259L8 10.2963H10L12 27.9259H10ZM24 10.2963L22 27.9259H20L22 10.2963H24Z"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M6 7.18518L5.5 4.07407H13V2H19V4.07407H26.5L26 7.18518H6ZM14 3.03704V4.07407H18V3.03704H14Z"/>
            </symbol>
            <symbol id="info" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 23.732 8.26801 30 16 30ZM16 29C23.1797 29 29 23.1797 29 16C29 8.8203 23.1797 3 16 3C8.8203 3 3 8.8203 3 16C3 23.1797 8.8203 29 16 29ZM14 11V27H18V11H14ZM18 9V5H14V9H18Z"/>
            </symbol>
            <symbol id="refresh" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M479.971,32.18c-21.72,21.211-42.89,43-64.52,64.301c-1.05,1.23-2.26-0.16-3.09-0.85
                    c-24.511-23.98-54.58-42.281-87.221-52.84c-37.6-12.16-78.449-14.07-117.029-5.59c-68.67,14.67-128.811,64.059-156.44,128.609
                    c0.031,0.014,0.062,0.025,0.093,0.039c-2.3,4.537-3.605,9.666-3.605,15.1c0,18.475,14.977,33.451,33.451,33.451
                    c15.831,0,29.084-11.002,32.555-25.773c19.757-41.979,58.832-74.445,103.967-85.527c52.2-13.17,111.37,1.33,149.4,40.041
                    c-22.03,21.83-44.391,43.34-66.33,65.26c59.52-0.32,119.06-0.141,178.59-0.09C480.291,149.611,479.931,90.891,479.971,32.18z"/>
                <path d="M431.609,297.5c-14.62,0-27.041,9.383-31.591,22.453c-0.009-0.004-0.019-0.008-0.027-0.012
                    c-19.11,42.59-57.57,76.219-102.84,88.18c-52.799,14.311-113.45,0.299-152.179-39.051c21.92-21.76,44.369-43.01,66.189-64.869
                    c-59.7,0.049-119.41,0.029-179.11,0.01c-0.14,58.6-0.159,117.189,0.011,175.789c21.92-21.91,43.75-43.91,65.79-65.699
                    c14.109,13.789,29.76,26.07,46.92,35.869c54.739,31.971,123.399,38.602,183.299,17.891
                    c57.477-19.297,106.073-63.178,131.212-118.318c3.645-5.357,5.776-11.824,5.776-18.793C465.06,312.477,450.083,297.5,431.609,297.5
                    z"/>
            </symbol>
            <symbol id="logo" viewBox="0 0 33 33" xmlns="http://www.w3.org/2000/svg">
                <rect x="23" y="1" width="9" height="9" fill="#EF7730"/>
                <rect x="12" y="1" width="9" height="9" fill="#F9D85E"/>
                <rect x="1" y="23" width="9" height="9" fill="#2845AD"/>
                <rect x="12" y="23" width="9" height="9" fill="#5494F8"/>
                <rect x="1" y="12" width="9" height="9" fill="#5494F8"/>
                <rect x="23" y="12" width="9" height="9" fill="#F9D85E"/>
            </symbol>
            <symbol id="add" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.7143 28.0001C17.7143 30.0001 14.2858 30.0001 14.2858 28.0001V17.7144H4.00006C2 17.7144 1.99968 14.2858 4.00006 14.2858H14.2858V4.00008C14.2858 2 17.7143 2.00002 17.7143 4.00008V14.2858H28.0001C30.0001 14.2858 30.0001 17.7144 28.0001 17.7144H17.7143V28.0001Z"/>
            </symbol>
            <symbol id="edit" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M26.3478 10.5217L21.4783 5.65217L5.65217 21.4783L10.5217 26.3478L26.3478 10.5217Z"/>
                <path d="M2 30L9.91304 26.9565L5.04348 22.087L2 30Z"/>
                <path d="M25.1304 2L22.087 5.04348L26.9565 9.91304L30 6.86957L25.1304 2Z"/>
            </symbol>
            <symbol id="save" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M4 29V4H24L28 8V29H4ZM8 6V13H22V6H8ZM20 7V12H18V7H20ZM7 19V26H25V19H7Z"/>
            </symbol>
            <symbol id="star-empty" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M19.1432 12.6738L16 3L12.8568 12.6738H2.68518L10.9142 18.6525L7.77098 28.3262L16 22.3475L24.229 28.3262L21.0858 18.6525L29.3148 12.6738H19.1432ZM18.6941 13.2918L15.9999 5L13.3058 13.2918H4.58725L11.6407 18.4164L8.94651 26.7082L15.9999 21.5836L23.0534 26.7082L20.3592 18.4164L27.4126 13.2918H18.6941Z"/>
            </symbol>
            <symbol id="star-filled" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M19.1432 12.6738L16 3L12.8568 12.6738H2.68518L10.9142 18.6525L7.77098 28.3262L16 22.3475L24.229 28.3262L21.0858 18.6525L29.3148 12.6738H19.1432Z"/>
            </symbol>
            <symbol id="twitter" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </symbol>
            <symbol id="telegram" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M32 62C48.5685 62 62 48.5685 62 32C62 15.4315 48.5685 2 32 2C15.4315 2 2 15.4315 2 32C2 48.5685 15.4315 62 32 62Z"/>
                <path d="M15.4996 31.4998L44.9996 19.9998C46.5994 19.3762 47.2632 20.717 47 21.9998C45.6667 28.4998 42.8 42.1998 42 44.9998C41.2 47.7998 39.6667 47.4998 39 46.9998L31.5 41.4998C31 42.1665 29.6 43.7998 28 44.9998C26.4 46.1998 25.6667 45.4998 25.5 44.9998L22.5 35.9998L15.9996 33.9998C14.5 33.4998 14.333 31.9998 15.4996 31.4998Z" fill="white"/>
                <path d="M31.5 41.5L27 38V46C27 46 28.1092 45.7385 31.5 41.5Z" fill="#A9C9DD"/>
                <path d="M40.5 25.9857C42.9 23.9857 40 25.5 38 26.4857L22.5 35.9999C24.5 42.3999 25.5 47 27 46V37.9857C30.5 34.819 38.1 27.9857 40.5 25.9857Z" fill="#C8DAEA"/>
            </symbol>
            <symbol id="website" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M32 62C40.8366 62 48 48.5685 48 32C48 15.4315 40.8366 2 32 2C23.1634 2 16 15.4315 16 32C16 48.5685 23.1634 62 32 62ZM32 59C39.9529 59 45 47.464 45 32C45 16.536 39.9529 5 32 5C24.0471 5 19 16.536 19 32C19 47.464 24.0471 59 32 59Z"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M32 62C48.5685 62 62 48.5685 62 32C62 15.4315 48.5685 2 32 2C15.4315 2 2 15.4315 2 32C2 48.5685 15.4315 62 32 62ZM32 60C46.9117 60 59 47.464 59 32C59 16.536 46.9117 4 32 4C17.0883 4 5 16.536 5 32C5 47.464 17.0883 60 32 60Z"/>
                <rect x="4" y="31" width="56" height="2"/>
                <rect x="31" y="3" width="2" height="58"/>
            </symbol>
            <symbol id="mirror" viewBox="0 0 36 64" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0 16.5266L8.83636 18.7949V8.10127L18 10.5316V0L27 2.26835V12.638L36 14.9063V47.7975L27 45.5291V56.0608L18 53.6304V64L8.83636 61.8937V51.5241L0 49.4177V16.5266ZM6.87273 44.2329V24.6278L19.8 27.5443V47.4734L6.87273 44.2329Z"/>
            </symbol>
            <symbol id="anchor" viewBox="0 0 64 64" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="32" fill="#4BDB4B"/>
                <path d="M27.2306 14.2259C25.6151 16.9615 13.499 39.1193 13.499 39.1193C10.7426 44.1527 20.1404 50.335 23.7304 44.8639C27.3204 39.3928 32.0771 30.6391 32.0771 30.6391L40.693 44.8639C44.7317 50.6085 53.3683 43.2226 50.3859 38.2986C47.4035 33.3747 38.8083 17.4174 36.9235 14.2259C35.0388 11.0344 28.8461 11.4904 27.2306 14.2259Z" fill="#4B4B4B"/>
            </symbol>
            <symbol id="pylon" viewBox="0 0 32 32" fill="#00eefa" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.5 19.5L6 12L7.5 19.5L6 24.5L2.5 19.5Z"/>
                <path d="M16 1L9 21L16 31L23 21L16 1Z"/>
                <path d="M26 12L29.5 19.5L26 24.5L24.5 19.5L26 12Z"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M16 21.5C22.6274 21.5 28 19.6569 28 18C28 16.3431 22.6274 15 16 15C9.37258 15 4 16.3431 4 18C4 19.6569 9.37258 21.5 16 21.5ZM16 20.75C22.0751 20.75 27 19.5188 27 18C27 16.4812 22.0751 15.25 16 15.25C9.92487 15.25 5 16.4812 5 18C5 19.5188 9.92487 20.75 16 20.75Z"/>
            </symbol>
            <symbol id="up-arrow" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 30H12V15H5L16 2L27 15H20V30Z"/>
            </symbol>
            <symbol id="down-arrow" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L20 2L20 17L27 17L16 30L5 17L12 17L12 2Z"/>
            </symbol>
            <symbol id="right-arrow" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 20L2 12L17 12L17 5L30 16L17 27L17 20L2 20Z"/>
            </symbol>
            <symbol id="left-arrow" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 12L30 20L15 20L15 27L2 16L15 5L15 12L30 12Z"/>
            </symbol>
            <symbol id="download" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 30H30V21.3846H26.7692V26.7692H5.23077V21.3846H2V30Z"/>
                <path d="M24.6154 16L16 24.6154L7.38462 16H12.7692V2H19.2308V16H24.6154Z"/>
            </symbol>
            <symbol id="upload" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 2L2 2L2 10.6154L5.23077 10.6154L5.23077 5.23077L26.7692 5.23077L26.7692 10.6154L30 10.6154L30 2Z"/>
                <path d="M7.38462 16L16 7.38461L24.6154 16L19.2308 16L19.2308 30L12.7692 30L12.7692 16L7.38462 16Z"/>
            </symbol>
            <symbol id="ellipses" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="3"/>
                <circle cx="6" cy="16" r="3"/>
                <circle cx="26" cy="16" r="3"/>
            </symbol>
            <symbol id="terra" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="32" fill="white"/>
                <path d="M53.3333 9.41175C43.7961 0.376455 28.2353 -0.627479 21.3333 4.39205C19.451 6.27448 14.4314 9.66273 14.4314 13.1765C14.4314 16.6902 18.1961 19.2418 20.0784 20.0784C24.4706 24.2614 33.1294 33.5059 35.1372 37.0196C29.6157 40.5333 28.4444 43.5033 28.2353 44.549C25.098 53.3333 36.3921 60.2353 38.902 60.2353C48.0378 60.2353 57.098 48.9412 58.3529 43.9216L53.3333 9.41175Z" fill="#2845AD"/>
                <path d="M20.0785 60.2353C11.9216 57.0981 -3.89015 43.9216 3.1373 21.3334C17.5686 38.2745 21.9608 45.8039 20.0785 60.2353Z" fill="#5494F8"/>
                <path d="M4.39215 18.1961C7.5294 12.7582 15.6863 2.38435 23.2157 4.39219C28.8627 6.27452 19.451 15.6863 4.39215 18.1961Z" fill="#5494F8"/>
                <path d="M59.6078 46.4314C54.5882 47.6863 40.0314 53.4588 42.0392 58.9804C46.4314 63.3726 57.098 52.0784 59.6078 46.4314Z" fill="#5494F8"/>
                <path d="M52.7059 8.78432C45.8039 4.39217 17.5686 13.1765 18.1961 23.2157C18.1961 38.2745 58.9804 46.598 60.8627 43.2941C67.7647 27.6079 58.1438 12.7582 52.7059 8.78432Z" fill="#5494F8"/>
            </symbol>
            <symbol id="luna" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="32" fill="white"/>
                <path d="M10.8905 9.36907C12.345 7.67211 12.9107 8.72261 12.8299 9.6115C12.8299 16.8842 17.1935 27.9909 29.3147 36.5206C35.8602 41.1267 47.739 45.0054 59.8602 42.3388C61.7996 41.8539 61.3955 42.9044 61.0723 43.5509C52.1026 64.8842 26.6481 68.0993 12.345 55.6721C-6.83412 39.0082 2.16321 17.1267 10.8905 9.36907Z" fill="#F9D85E"/>
                <path d="M45.7996 4.03575C32.6904 -1.92295 19.6178 2.0963 19.1329 5.24787C18.3571 10.8721 37.7996 15.9145 48.2238 20.2781L63.0117 28.0357C62.5268 20.763 56.4662 8.8842 45.7996 4.03575Z" fill="#F9D85E"/>
                <path d="M47.739 20.0357C49.4359 23.6721 50.4056 27.5509 62.7693 36.763C63.0117 35.2276 63.3996 31.3327 63.0117 28.0357C62.5268 24.6418 55.4965 23.1872 47.739 20.0357Z" fill="#EF7730"/>
            </symbol>
        </defs> 
    </svg>;
}

export default Icons;