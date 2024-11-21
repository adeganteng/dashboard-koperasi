export const calculateCategoryTotals = (products, categories) => {
  // Hitung jumlah produk berdasarkan kategori
  // Hitung jumlah produk berdasarkan kategori
  const counts = categories.map((category) => {
    // Cari jumlah produk di setiap kategori
    const total = products.filter(
      (product) => product.category === category.name
    ).length;

    return {
      id: category.id,
      name: category.name,
      category: category.name,
      total,
    };
  });

  return counts;
};

export const formattedToRupiah = (amount) => {
  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0, // Tidak ada desimal
  }).format(amount);

  return formatted;
};
