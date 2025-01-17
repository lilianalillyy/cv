import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

import {
  CVEntryContent,
  CVEntryContentSmall,
  CVEntryContentTitle,
  CVEntryList,
} from "./src/components";
import { GitHubIcon } from "./src/components/icons/GitHubIcon";
import { Config } from "./src/utils/types";

export const config: Config = {
  name: ["Name", "Surname"],
  role: "Interesting role",
  contacts: [
    {
      icon: EnvelopeIcon,
      value: "email@example.com",
      href: "mailto:pilchova@lilianaa.dev",
    },
    {
      icon: PhoneIcon,
      value: "+420600000000",
      href: "tel:+420600000000",
    },
    {
      icon: GitHubIcon,
      value: "@github",
      href: "https://github.com/github",
    },
  ],
  sections: [
    {
      title: "About me",
      content: (
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat
          provident omnis nemo dolor architecto corrupti at nesciunt labore
          error odit! Dolores laborum maiores, optio accusamus quo facere
          molestiae vitae ipsam.
        </p>
      ),
    },
    {
      title: "Experience",
      date: "10/2000 - 10/2025",
      content: (
        <CVEntryContent>
          <div>
            <CVEntryContentTitle>Your position, Company</CVEntryContentTitle>
            <CVEntryContentSmall>
              Point-out &bull; something &bull;
            </CVEntryContentSmall>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A quidem
            itaque totam, ad architecto ullam nisi ut aperiam, quibusdam rerum,
            nesciunt ipsum quaerat enim perferendis laboriosam voluptas at earum
            dignissimos. Lorem ipsum dolor sit amet consectetur, adipisicing
            elit. Rem voluptatem voluptates nobis excepturi quo, omnis itaque
            reiciendis vel et earum, suscipit tempore reprehenderit quis in
            recusandae? Nisi, pariatur vel? Magni.
          </p>
          <CVEntryList>
            <li>Something important</li>
            <li>Something else important</li>
            <li>Lorem ipsum dolor sit amet</li>
          </CVEntryList>
        </CVEntryContent>
      ),
    },
    {
      title: "Education",
      children: [
        {
          date: "2023",
          content: <CVEntryContentTitle>Some school name</CVEntryContentTitle>,
        },
      ],
    },
  ],
};
