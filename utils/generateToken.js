const fetch = (...args) =>
    import("node-fetch").then(({ default: fetch }) => fetch(...args));

const generateAccessToken = async () => {
    const clientId = 'AfAweYYs3vmSFccONdbmpuD4eqBGamXgJh3r3Iq43FpsGbsVmUd2kSqEZQcDtBvuYhsWHssNyts83wJl'
    const clientSec = 'EBaYpAvyhEJ447YOa4wIpZ293EU7gJ8MdkoAO0sArQ_U4V3HCKC0fHdRcOzNxbnp4bPxiH1JTY2-gKkp'
    try {
        if (!clientId || !clientSec) {
            return res.status(401).json({ success: false, message: 'Api Key and secret not found!' })
        }
        const response = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
            method: 'POST',
            headers: {
                "accept": "application/json",
                "accept-language": "en_US",
                "content-type": "application/x-www-form-urlencoded",
                "authorization": `basic ${Buffer.from(`${clientId}:${clientSec}`).toString('base64')}`
            },
            // headers: {
            //     Authorization: `Basic ${Buffer.from(`${clientId}:${clientSec}`).toString('base64')}`,
            // },
            body: 'grant_type=client_credentials'
        })

        const data = await response.json()
        return data
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}

module.exports = { generateAccessToken }