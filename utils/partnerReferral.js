const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));

const onBoardSeller = async (token, data) => {
    try {
        const res = await fetch('https://api.sandbox.paypal.com/v2/customer/partner-referrals', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${access_token}`
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        return await res.json()
    } catch (err) {
        throw new Error(err)
    }
}

module.exports = { onBoardSeller }