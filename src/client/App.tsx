import image from "./assets/juice-mendez-0wPugJfKafQ-unsplash.jpg";
import logo from "./assets/logo-gbg.svg";
import ActivitiesForm from "./forms/ActivitiesForm";

const App = () => {
  return (
    <div className="h-screen w-screen">
      <header className="h-20 flex items-center px-4 border-b border-gray/20 fixed top-0 left-0 right-0 z-10 bg-white">
        <img src={logo} alt="Göteborgs Stad" className="h-12" />
      </header>
      <div className="flex w-screen h-screen">
        <div className="relative flex-1">
          <img
            src={image}
            alt="Glada ungdomar utomhus"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 p-4 md:py-32 px-12 overflow-y-auto flex flex-col">
          <div className="max-w-[500px] mx-auto w-full">
            <h1 className="text-4xl font-bold mb-6">Anmälan lägerverksamhet</h1>
            <p className="mb-12 text-lg">
              Fyll i formuläret nedan för att skicka in din anmälan till
              lägerverksamheten.
            </p>
            <ActivitiesForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
