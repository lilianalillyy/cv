import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

export interface Section {
  title?: ReactNode;
  date?: ReactNode;
  content?: ReactNode;
  children?: Section[];
}

export interface Contact {
  icon: typeof EnvelopeIcon; // random icon for typeof
  value: string;
  href: string;
}

export interface Config {
  name: [string, string];
  role: string;
  contacts: Contact[];
  sections: Section[];
}
