import TiltCard from "../tiltCard/TiltCard";
import person from "../../assets/person.jpg";
import { MdOutlineFileDownload } from "react-icons/md";

function About() {
  return (
    <div id="about" className="mx-auto w-full max-w-[1200px] scroll-mt-28 px-5">
      <section className="glass flex flex-col gap-8 rounded-[10px] p-5 text-white sm:p-[25px] lg:flex-row lg:gap-5">
        <div className="flex w-full justify-center lg:w-1/2">
          <TiltCard className="w-full max-w-[300px]">
            <img
              src={person}
              alt="Jamolitdinov Izzatillo"
              className="h-[280px] w-full object-cover sm:h-[320px]"
            />
            <div className="tilt-text absolute top-4 left-4 rounded-full bg-black/35 px-3.5 py-2.5 text-sm backdrop-blur-[10px]">
              Jamolitdinov - Dizayner
            </div>
          </TiltCard>
        </div>

        <div className="flex w-full flex-col gap-5 lg:w-1/2">
          <h2 className="text-2xl font-bold">Jamolitdinov Izzatillo</h2>
          <p>
            Man Jamolitdinov Izzatilloh - vizual orqali fikrni yetkazadigan
            grafik dizaynerman. Graphic, Web (UI/UX), Motion va 3D dizayn
            yo‘nalishlarida loyihalarni strategiya va foydalanuvchi tajribasi
            asosida ishlab chiqaman. +3 yildan ortiq tajribaga ega grafik
            dizayner sifatida turli sohalardagi brendlar bilan ishlaganman.
          </p>
          <p>
            Maqsadim — dizayn orqali brendni zamonaviy, tushunarli va ishonchli
            ko‘rsatish.
          </p>

          <button className="glass flex h-[35px] w-[170px] items-center justify-center gap-2.5 rounded-[10px] text-white transition-transform duration-100 active:scale-[0.98]">
            <MdOutlineFileDownload /> Resumeni yuklash
          </button>
        </div>
      </section>
    </div>
  );
}

export default About;
