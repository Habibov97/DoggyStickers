let api

export default  api = {
    getAllData  : async () => await (await fetch("https://doggystickers.vercel.app/_next/data/xyaZmLIU1DsdFtyNNRye4/index.json")).json(),
    getALLProductsData : async () => await (await fetch("https://doggystickers.vercel.app/_next/data/xyaZmLIU1DsdFtyNNRye4/index.json")).json()
}