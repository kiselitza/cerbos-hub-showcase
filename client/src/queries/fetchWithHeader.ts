export default function doFetch(url: string) {
  return fetch(url, {
    method: "GET",
    headers: {
      "x-cerbos-no-cache": "true", // bypass cachde for demo
    },
  });
}
