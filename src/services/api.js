export const fetchTransactions = async () => {
  try {
    const res = await fetch(
      "https://69d20fa45043d95be9716950.mockapi.io/transactions/transactions"
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};