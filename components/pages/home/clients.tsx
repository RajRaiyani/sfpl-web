import Image from "next/image";

interface Client {
  src: string;
  alt: string;
}

const clients: Client[] = [
  { src: "/images/clients/adani.webp", alt: "Adani" },
  { src: "/images/clients/anant.webp", alt: "Anant" },
  { src: "/images/clients/binori.webp", alt: "Binori" },
  { src: "/images/clients/dilip-ladani.webp", alt: "Dilip Ladani" },
  { src: "/images/clients/ekaam.png", alt: "Ekaam" },
  { src: "/images/clients/gol.webp", alt: "Gol" },
  { src: "/images/clients/lifestyle.webp", alt: "Lifestyle" },
  { src: "/images/clients/lord.webp", alt: "Lord" },
  { src: "/images/clients/Malani.png", alt: "Malani" },
  { src: "/images/clients/oscar.webp", alt: "Oscar" },
  { src: "/images/clients/palladium.webp", alt: "Palladium" },
  { src: "/images/clients/railway.webp", alt: "Railway" },
  { src: "/images/clients/rk.webp", alt: "RK" },
  { src: "/images/clients/sarovar.webp", alt: "Sarovar" },
  { src: "/images/clients/shivalik_ship.jpg", alt: "Shivalik Ship" },
  { src: "/images/clients/the_view.jpg", alt: "The View" },
  { src: "/images/clients/the-fern.webp", alt: "The Fern" },
  { src: "/images/clients/van-heusen.webp", alt: "Van Heusen" },
  { src: "/images/clients/wtc.webp", alt: "WTC" },
  { src: "/images/clients/zudio.webp", alt: "Zudio" },
];

const midpoint = Math.ceil(clients.length / 2);
const topRow = clients.slice(0, midpoint);
const bottomRow = clients.slice(midpoint);

function LogoRow({
  items,
  direction,
}: {
  items: Client[];
  direction: "left" | "right";
}) {
  const animClass =
    direction === "left"
      ? "technology-ticker-section-left"
      : "technology-ticker-section-right";

  return (
    <div className="flex items-center gap-7 overflow-hidden" aria-hidden="true">
      {[0, 1].map((dup) => (
        <div
          key={dup}
          className={`${animClass} flex h-fit shrink-0 flex-nowrap gap-7 whitespace-nowrap`}
        >
          {items.map((client) => (
            <div key={`${dup}-${client.alt}`} className="mx-6 inline-block">
              <Image
                src={client.src}
                alt=""
                width={100}
                height={60}
                className="h-12 w-auto object-contain sm:h-14"
                loading="lazy"
                sizes="100px"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Clients() {
  return (
    <section
      aria-labelledby="clients-heading"
      className="w-full bg-white py-14 sm:py-16 md:py-24"
    >
      <div className="container mx-auto space-y-8 px-4 sm:space-y-10">
        <div className="text-center">
          <h2
            id="clients-heading"
            className="mb-4 inline-block text-3xl font-extrabold text-gray-900 sm:text-4xl md:text-5xl"
          >
            <span className="text-gray-800">Our</span>&nbsp;
            <span className="text-primary">Clients</span>
            <span className="ms-auto mt-2 block h-1 w-16 rounded bg-primary" />
          </h2>
          <p className="sr-only">
            Trusted by organisations across India including Adani, Lifestyle,
            Palladium, The Fern, Van Heusen, WTC, and more.
          </p>
        </div>

        <LogoRow items={topRow} direction="left" />
        <LogoRow items={bottomRow} direction="right" />
      </div>
    </section>
  );
}
