import image from "./assets/image.jpg";
import logo from "./assets/logo-gbg.svg";
import RegistrationForm from "./forms/RegistrationForm";

const App = () => {
  return (
    <div className="h-screen w-screen">
      <header className="h-16 lg:h-20 flex items-center px-4 border-b border-gray/20 fixed top-0 left-0 right-0 z-20 bg-white">
        <img src={logo} alt="Göteborgs Stad" className="h-8 lg:h-12" />
      </header>
      <div className="flex flex-col lg:flex-row w-full max-w-screen-2xl mx-auto h-screen overflow-y-auto lg:overflow-y-hidden">
        <div className="relative lg:w-full lg:flex-1 h-64 lg:h-full">
          <div className="absolute inset-0 bg-primary/30 z-10" />
          <img
            src={image}
            alt="Glada ungdomar utomhus"
            className="w-full h-full object-cover relative"
          />
        </div>

        <div className="lg:flex-1 px-4 py-8 lg:py-38 lg:px-12 lg:overflow-y-auto flex flex-col">
          <div className="max-w-[500px] w-full">
            <h1 className="mb-6">Anmälan lägerverksamhet</h1>
            <p className="mb-12 text-lg">
              Fyll i formuläret nedan för att skicka in din anmälan till
              lägerverksamheten.
            </p>
            <RegistrationForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
