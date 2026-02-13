export interface Movie {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    genre_ids: number[];
    adult: boolean;
    video: boolean;
}

export interface Genre {
    id: number;
    name: string;
}

export interface CastMember {
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}

export interface VideoResult {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
}

export interface MovieDetail extends Movie {
    genres: Genre[];
    runtime: number;
    status: string;
    tagline: string;
    production_companies: { id: number; logo_path: string | null; name: string }[];
    credits: {
        cast: CastMember[];
        crew: any[];
    };
    videos: {
        results: VideoResult[];
    };
    similar: {
        results: Movie[];
    };
}

export interface PaginatedResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}
