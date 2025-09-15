import Image from "next/image";

type Pet = {
    id: string;
    name: string;
    ownerName: string;
    imageUrl: string;
    age: number;
    notes: string;
};

export default function PetList({pets}: { pets: Pet[] }) {
    return (
        <ul className="bg-white border-b border-black/[0.08]">
            {pets.map((pet) => (
                <li key={pet.id}>
                    <button
                        className="flex items-center h-[70px]
                        w-full cursor-pointer px-5
                        text-base gap-3 hover:bg-[#EFF1F2]
                        focus:bg-[#EFF1F2] transition">
                        <Image
                            src={pet.imageUrl}
                            alt="Pet image"
                            width={45}
                            height={45}
                            className="rounded-full w-[45px] h-[45px] object-cover"
                        />
                        <p className="font-semibold">{pet.name}</p>
                    </button>
                </li>
            ))}
        </ul>
    );
}
