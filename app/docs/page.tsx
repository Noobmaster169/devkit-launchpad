import Image from "next/image";

export default function Docs(){
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div>
                <h2 className="text-center text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-cyan-500 text-transparent bg-clip-text mt-2">
                    Coming Soon!
                </h2>
                <div className="w-[350px] h-[350px] mx-auto rounded-xl overflow-hidden mt-6 opacity-90">
                    <Image
                        width={350}
                        height={350}
                        src="/create_token.webp"
                        alt="Coming Soon"
                    />
                </div>
            </div>
        </div>
      );
}