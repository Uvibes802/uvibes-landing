import { useEffect, useState } from "react";
import { sanitizePlainText } from "@/services/blog/sanitize";

export interface PricingItem {
  planName: string;
  price: string;
}

export default function usePricing() {
  const [pricingData, setPricingData] = useState<PricingItem[]>([]);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    fetch(`${apiUrl}/wp-json/wp/v2/tags?slug=pricing`)
      .then((res) => res.json())
      .then((tags) => {
        const tagId = tags[0]?.id;
        if (!tagId) { setPricingData([]); return; }

        return fetch(`${apiUrl}/wp-json/wp/v2/posts?tags=${tagId}`)
          .then((res) => res.json())
          .then((data) => {
            setPricingData(
              data.map((item: { title: { rendered: string }; content: { rendered: string } }) => ({
                planName: sanitizePlainText(item.title.rendered).toUpperCase(),
                price: sanitizePlainText(item.content.rendered),
              }))
            );
          });
      })
      .catch(() => setPricingData([]));
  }, []);

  return pricingData;
}
