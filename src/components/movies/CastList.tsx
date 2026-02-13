import { getImageUrl } from '@/lib/api/endpoints';

interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

interface CastListProps {
    cast: CastMember[];
}

const CastList = ({ cast }: CastListProps) => {
    if (!cast || cast.length === 0) return null;

    return (
        <div className="mt-8">
            <h3 className="text-xl font-display text-white mb-4">Top Cast</h3>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {cast.slice(0, 10).map((member) => (
                    <div key={member.id} className="flex-shrink-0 w-32">
                        <div className="w-32 h-32 rounded-full overflow-hidden mb-2 border-2 border-white/10">
                            <img
                                src={getImageUrl(member.profile_path, 'w500')} // Use w500 or smaller for profiles if available, or just w500
                                alt={member.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                        <p className="text-white text-sm font-bold text-center truncate">{member.name}</p>
                        <p className="text-gray-400 text-xs text-center truncate">{member.character}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CastList;
