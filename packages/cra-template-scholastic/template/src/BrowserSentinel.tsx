import React, {useLayoutEffect} from "react"
import browserUpdate from "browser-update"

const BrowserSentinel: React.FC = () => {
    useLayoutEffect(() => {
        // http://localhost:3000/screens/#test-bu
        browserUpdate({
            l: "en",
            text: {
                msg: "OLD BROWSER VERSION",
                msgmore:
                    "You are using an old version of your browser ({brow_name}). Please update it to use all features of The Scholastic Network.",
                bupdate: "Update",
                bignore: "Ignore message",
            },
            required: {f: 41, c: 69, o: 56},
        })
    }, [])
    return null
}

export default BrowserSentinel
