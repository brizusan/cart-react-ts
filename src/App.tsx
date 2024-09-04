import { Footer, Guitarra, Header } from "./components";
import type { Product } from "./data";
import { useCart } from "./hooks/useCart";

function App() {
  const {
    cart,
    guitarras,
    isNotEmpty,
    totalPagar,
    agregarCarrito,
    cleanCart,
    removeItemCart,
    disminuirElemento,
    aumentarElemento,
  } = useCart();

  return (
    <>
      <Header 
        cart={cart}
        isNotEmpty={isNotEmpty}
        totalPagar={totalPagar}
        cleanCart={cleanCart}
        removeItemCart={removeItemCart}
        disminuirElemento={disminuirElemento}
        aumentarElemento={aumentarElemento}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {guitarras.map((guitarra: Product) => (
            <Guitarra
              key={guitarra.id}
              guitarra={guitarra}
              agregarCarrito={agregarCarrito}
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
