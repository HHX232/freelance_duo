import React from "react";

export interface FooterSiteMapLink {
    title: string,
    href: string,
}

export interface FooterSitemapWithAccordionLink {
    header: React.ReactNode,
    items: FooterSiteMapLink[],
}