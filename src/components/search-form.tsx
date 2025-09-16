'use client';
import {useSearchContext} from "@/lib/hooks";

export default function SearchForm() {
    const {searchQuery, handleChangeSearchQuery} = useSearchContext();
    return (
        <form className={'w-full h-full'}>
            <input
                onChange={(e) => handleChangeSearchQuery(e.target.value)}
                value={searchQuery}
                className={'w-full h-full bg-white/20 placeholder:text-white/50 rounded-md px-5 outline-none transition focus:bg-white/50 hover:bg-white/50'}
                type={'search'}
                placeholder={'Search for a pet...'}
            />
        </form>
    )
}