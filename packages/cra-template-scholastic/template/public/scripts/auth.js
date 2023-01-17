window.scholasticNamespace = window.scholasticNamespace || {}
if (!window.scholasticNamespace?.bundleReady) {
    window.scholasticNamespace._bundleReady = false

    window.scholasticNamespace.authStatus = "Loading"

    const loaderId = "scholastic_bundle_loader"
    const headerId = "scholastic_bundle_header"

    Object.defineProperty(window.scholasticNamespace, "bundleReady", {
        get: function () {
            return this._bundleReady
        },
        set: function (value) {
            this._bundleReady = value
            if (value) {
                const loader = document.getElementById(loaderId)
                if (loader) loader.remove()
            }
        },
    })

    fetch("/api/auth", {
        headers: {
            // TODO: Change porta;s
            ["Portal-Type"]: "ADMIN",
            ["Portal-Origin"]: "ADMIN",
            ["Client-Window"]: `${document.documentElement.clientWidth}x${document.documentElement.clientHeight}`,
            Accept: "application/json, text/plain, */*",
        },
        method: "POST",
    })
        .then((response) => {
            window.scholasticNamespace.authETag = response.headers.get("ETag")
            return response.json()
        })
        .then((data) => {
            if (data.token) {
                window.scholasticNamespace.authResponse = data
                window.scholasticNamespace.authStatus = "Success"
            } else window.scholasticNamespace.authStatus = undefined
        })
        .catch(() => {
            window.scholasticNamespace.authStatus = undefined
            const loader = document.getElementById(loaderId)
            const header = document.getElementById(headerId)
            if (loader) loader.remove()
            if (header) header.remove()
        })

    const loader = document.createElement("div")
    loader.style.position = "absolute"
    loader.style.left = "50%"
    loader.style.transform = "translateX(-50%)"
    loader.style.top = "160px"

    const header = document.createElement("div")
    header.style.position = "absolute"
    header.style.left = "0"
    header.style.right = "0"
    header.style.height = "60px"
    header.style.backgroundColor = "#003a58"
    header.id = headerId

    loader.id = loaderId
    loader.innerHTML = `
     <svg width="98" height="57" viewBox="0 0 98 57" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M49.0005 26.2941C43.2071 26.2941 37.7184 27.5661 32.7933 29.8434C31.4583 30.4607 29.8719 29.8869 29.25 28.5617C28.6282 27.2365 29.2063 25.6618 30.5413 25.0445C36.1566 22.448 42.4125 21 49.0005 21C55.5885 21 61.8444 22.448 67.4597 25.0445C68.7947 25.6618 69.3728 27.2365 68.751 28.5617C68.1291 29.8869 66.5427 30.4607 65.2077 29.8434C60.2826 27.5661 54.7939 26.2941 49.0005 26.2941Z"
                fill="#FEC30C"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M49.0003 37.8234C44.9755 37.8234 41.1627 38.6992 37.7365 40.2681C36.3992 40.8805 34.815 40.3008 34.198 38.9734C33.5811 37.6459 34.1651 36.0733 35.5024 35.4609C39.6142 33.578 44.188 32.5293 49.0003 32.5293C53.8126 32.5293 58.3864 33.578 62.4982 35.4609C63.8355 36.0733 64.4195 37.6459 63.8026 38.9734C63.1856 40.3008 61.6014 40.8805 60.2641 40.2681C56.8379 38.6992 53.0251 37.8234 49.0003 37.8234Z"
                fill="#FEC30C"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M49.0005 49.3527C46.6909 49.3527 44.506 49.8556 42.5435 50.7557C41.2066 51.3688 39.622 50.79 39.0043 49.4629C38.3866 48.1358 38.9697 46.5629 40.3067 45.9497C42.9555 44.7349 45.9023 44.0586 49.0005 44.0586C52.0987 44.0586 55.0454 44.7349 57.6943 45.9497C59.0313 46.5629 59.6143 48.1358 58.9967 49.4629C58.379 50.79 56.7944 51.3688 55.4575 50.7557C53.4949 49.8556 51.31 49.3527 49.0005 49.3527Z"
                fill="#FEC30C"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M72.1844 42.4918C71.3521 41.0592 71.8388 39.2231 73.2714 38.3908L88.8963 29.3129L48.9034 6.44072L8.80062 29.3758L23.6324 38.4237C25.0469 39.2865 25.494 41.1327 24.6312 42.5471C23.7683 43.9615 21.9222 44.4087 20.5078 43.5458L1.48558 31.9417C-0.528256 30.7131 -0.486409 27.7752 1.56095 26.6043L47.3643 0.409055C48.3178 -0.136283 49.4889 -0.136386 50.4424 0.408952L96.2422 26.6021C98.3153 27.7878 98.3256 30.7738 96.2605 31.9736L76.2855 43.5787C74.8529 44.4111 73.0168 43.9244 72.1844 42.4918Z"
                fill="#003A58"
            />
            <path
                d="M85.9034 46.9848C83.142 46.9848 80.9034 49.2233 80.9034 51.9848V56.9848H90.9034V51.9848C90.9034 49.2233 88.6648 46.9848 85.9034 46.9848Z"
                fill="#003A58"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M85.9034 32.9848C87.5603 32.9848 88.9034 34.3279 88.9034 35.9848V47.9848C88.9034 49.6416 87.5603 50.9848 85.9034 50.9848C84.2466 50.9848 82.9034 49.6416 82.9034 47.9848V35.9848C82.9034 34.3279 84.2466 32.9848 85.9034 32.9848Z"
                fill="#003A58"
            />
        </svg>
    `

    document.body.style.margin = "0"
    document.body.style.padding = "0"
    document.body.appendChild(header)
    if (!localStorage.getItem("lastAuthData")) {
        document.body.appendChild(loader)
        const svg = document.getElementById(loaderId).getElementsByTagName("svg")[0]
        const firstPath = svg.getElementsByTagName("path")[0]
        const secondPath = svg.getElementsByTagName("path")[1]
        const thirdPath = svg.getElementsByTagName("path")[2]
        firstPath.animate(
            [
                {fillOpacity: 0.2, offset: 0},
                {fillOpacity: 0.2, offset: 0.25},
                {fillOpacity: 0.2, offset: 0.5},
                {fillOpacity: 1, offset: 0.75},
                {fillOpacity: 0.2, offset: 1},
            ],
            {
                duration: 2000,
                iterations: Infinity,
                easing: "linear",
            }
        )
        secondPath.animate(
            [
                {fillOpacity: 0.4, offset: 0},
                {fillOpacity: 0.4, offset: 0.25},
                {fillOpacity: 1, offset: 0.5},
                {fillOpacity: 0.4, offset: 0.75},
                {fillOpacity: 0.4, offset: 1},
            ],
            {
                duration: 2000,
                iterations: Infinity,
                easing: "linear",
            }
        )

        thirdPath.animate(
            [
                {fillOpacity: 0.6, offset: 0},
                {fillOpacity: 1, offset: 0.25},
                {fillOpacity: 0.6, offset: 0.5},
                {fillOpacity: 0.6, offset: 0.75},
                {fillOpacity: 0.6, offset: 1},
            ],
            {
                duration: 2000,
                iterations: Infinity,
                easing: "linear",
            }
        )
    }
}
