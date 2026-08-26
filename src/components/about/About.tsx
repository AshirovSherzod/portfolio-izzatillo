import TiltCard from "../tiltCard/TiltCard";
import person from "../../assets/person.jpg";
import { MdOutlineFileDownload } from "react-icons/md";

function About() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-5">
      <section className="glass flex gap-5 rounded-[10px] p-[25px] text-white">
        <div className="w-1/2">
          <TiltCard>
            <img
              src={person}
              alt=""
              className="h-[320px] w-[300px] object-cover"
            />
            <div className="tilt-text absolute top-4 left-4 rounded-full bg-black/35 px-3.5 py-2.5 backdrop-blur-[10px]">
              Jamolitdinov - Dizayner
            </div>
          </TiltCard>
        </div>

        <div className="flex w-1/2 flex-col gap-5">
          <h2>Jamolitdinov Izzatillo</h2>
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
