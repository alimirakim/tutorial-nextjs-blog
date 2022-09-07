/**
 * See API Routes docs: https://nextjs.org/docs/api-routes/introduction
 * @param {*} req HTTP incoming message
 * @param {*} res HTTP server response
 */
export default function handler(req, res) {
    const email = req.body.email
    // Then save email to your database, etc...

    res.status(200).json({text: 'Hello'})
}