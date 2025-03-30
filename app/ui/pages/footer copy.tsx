import { textData } from "@/app/lib/textData";

export default function Footer() {
  return (
    <div className="bg-black px-[2%] md:px-[5rem] py-10">
      <div className="bg-black">
        <div className="grid grid-cols-3">
        <div>
            <div className=" ">
              <text className=" text-2xl font-mono font-Viga">{textData.landPage.heading}
              </text>

            </div>
          </div>
          <div>
            <div className="">
              <text className="text-2xl font-mono font-Viga">Uppgifter
              </text>

            </div>
          </div>
          <div>
            <div className=" ">
              <text className=" text-2xl font-mono font-Viga z-10">Följ oss
              </text>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
