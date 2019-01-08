import { from, Observable, throwError } from "rxjs";
import { flatMap } from "rxjs/operators";

interface Record {
  label: string;
}

interface Link {
  rel: string;
  type: string;
  href: string;
}

interface SelfLink {
  rel: "self";
  href: string;
}

interface Author {
  name: Record;
  uri: Record;
}

interface EntryImImage {
  label: string;
  attributes: {
    height: string;
  };
}

interface EntryImPrice {
  label: string;
  attributes: {
    amount: string;
    currency: string;
  };
}

interface EntryLink {
  label: string;
  attributes: Link;
}

interface EntryId {
  label: string;
  attributes: {
    "im:id": string;
  };
}

interface EntryCategory {
  attributes: {
    "im:id": string;
    term: string;
    scheme: string;
    label: string;
  };
}

interface EntryImReleaseDate {
  label: string;
  attributes: Record;
}

interface Entry {
  "im:name": Record;
  "im:image": EntryImImage[];
  "im:itemCount": Record;
  "im:price": EntryImPrice;
  rights: Record;
  title: Record;
  link: EntryLink;
  id: EntryId;
  "im:artist": Record;
  category: EntryCategory;
  "im:releaseDate": EntryImReleaseDate;
}

interface TopAlbumsResponse {
  feed: {
    author: Author;
    entry: Entry[];
    updated: Record;
    rights: Record;
    title: Record;
    icon: Record;
    link: [Link, SelfLink];
    id: Record;
  };
}

export default class ITunesService {
  private static itunesApiUrl = "https://itunes.apple.com/us/rss";

  private static createTopAlbumEndpointUrl = (songsLimit: number) =>
    `${ITunesService.itunesApiUrl}/topalbums/limit=${songsLimit}/json`;

  getTopAlbums(): Observable<TopAlbumsResponse> {
    const url = ITunesService.createTopAlbumEndpointUrl(100);
    return from(fetch(url)).pipe(
      flatMap((response: Response) => {
        if (response.ok) {
          return response.json() as Promise<TopAlbumsResponse>;
        }
        return throwError(
          `Api error (Code: ${response.status}): ${response.statusText}`
        );
      })
    );
  }
}
