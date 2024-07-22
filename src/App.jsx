import { useEffect, useState } from "react";

function App() {
  const [result, setResult] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedVariants, setSelectedVariants] = useState([]);

  const data = [
    {
      id: "1",
      name: "Indomie",
      variants: [
        {
          id: "Indomie#01",
          productId: "1",
          name: "Soto",
          price: 3500,
        },
        {
          id: "Indomie#02",
          productId: "1",
          name: "Goreng Original",
          price: 4000,
        },
        {
          id: "Indomie#03",
          productId: "1",
          name: "Kari Ayam",
          price: 3200,
        },
      ],
    },
    {
      id: "2",
      name: "Coca Cola",
      variants: [
        {
          id: "CocaCola#01",
          productId: "2",
          name: "350ml",
          price: 5000,
        },
        {
          id: "CocaCola#02",
          productId: "2",
          name: "1 Liter",
          price: 25000,
        },
      ],
    },
    {
      id: "3",
      name: "Aqua",
      variants: [
        {
          id: "Aqua#01",
          productId: "3",
          name: "350ml",
          price: 3000,
        },
        {
          id: "Aqua#02",
          productId: "3",
          name: "1,5 Liter",
          price: 5000,
        },
      ],
    },
  ];

  const handleSelectProduct = (e) => {
    // Membatalkan ceklis jika sebelumnya sudah terceklis
    if (selectedProduct === e.target.id) {
      setSelectedProduct("");
      setSelectedVariants([]);
      return;
    }

    // Melakukan ceklis ke semua variant
    const variantId = [];
    data.map((p) => {
      if (p.id === e.target.id) {
        p.variants.forEach((d) => {
          variantId.push(d.id);
        });
      }
    });
    console.log(variantId);
    setSelectedProduct(e.target.id);
    setSelectedVariants(variantId);
  };

  const getProductId = (target) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].variants.find((v) => v.id === target)) {
        return data[i].id;
      }
    }
  };

  const handleSelectVariant = (e) => {
    let selectProductId = getProductId(e.target.id);

    // cek apakah produk yang dipilih adalah produk yang sudah terceklis
    if (selectedProduct === selectProductId) {
      if (selectedVariants.includes(e.target.id)) {
        const newVariants = selectedVariants.filter((v) => v !== e.target.id); // menghilangkan ceklis variant
        console.log(newVariants);
        setSelectedVariants(newVariants);
        return;
      }
      setSelectedVariants([...selectedVariants, e.target.id]);
      return;
    }

    setSelectedProduct(selectProductId);
    setSelectedVariants([e.target.id]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataProduct = data.find((d) => d.id === selectedProduct);
    const variants = dataProduct.variants.filter((v) =>
      selectedVariants.includes(v.id)
    );
    setResult({ ...dataProduct, variants });
  };

  const handleReset = (e) => {
    setSelectedVariants([]);
    setSelectedProduct("");
    setResult(null);
  };

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center gap-y-10">
        <p className="font-semibold text-2xl">Frontend Test</p>
        <div className="flex flex-row gap-x-5">
          <form
            action=""
            className="flex flex-col gap-y-6 w-72 border-2 border-black rounded-lg p-4"
            onSubmit={handleSubmit}
            onReset={handleReset}
          >
            <div className="flex flex-col items-start gap-y-3">
              {data &&
                data.map((d, i) => (
                  <div key={i + 1} className="text-lg">
                    <label
                      className="flex gap-x-2 mr-8 cursor-pointer"
                      htmlFor={d.id}
                    >
                      <input
                        type="checkbox"
                        name={d.id}
                        id={d.id}
                        checked={selectedProduct === d.id}
                        onChange={handleSelectProduct}
                      />
                      <span>{d.name}</span>
                    </label>

                    {/* Variant list */}
                    <div className="ms-4">
                      {d.variants.map((v, i) => (
                        <label
                          key={i}
                          className="flex gap-x-2 mr-8 cursor-pointer"
                          htmlFor={v.id}
                        >
                          <input
                            type="checkbox"
                            name={v.id}
                            id={v.id}
                            checked={selectedVariants.includes(v.id)}
                            onChange={handleSelectVariant}
                          />
                          <span>{v.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex flex-row items-center justify-between">
              <input
                className="w-[47%] py-2 px-8 text-white bg-slate-800 rounded-md cursor-pointer"
                type="reset"
                value="Reset"
              />
              <input
                className="w-[47%] py-2 px-8 text-white bg-blue-800 rounded-md cursor-pointer"
                type="submit"
                value="Simpan"
              />
            </div>
          </form>
          <div className="w-72 h-fit border-2 border-black rounded-lg p-4 bg-blue-100">
            <p className="font-semibold mb-6">Result :</p>
            <ul className="flex flex-col justify-between gap-y-3">
              {result &&
                result.variants.map((r, i) => (
                  <li key={i + 1} className="flex flex-row justify-between">
                    <span>
                      {result.name}, {r.name}
                    </span>
                    <span>Rp {r.price}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
