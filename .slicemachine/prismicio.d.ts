// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismicT from "@prismicio/types";
import type * as prismic from "@prismicio/client";

type Simplify<T> = {
    [KeyType in keyof T]: T[KeyType];
};
/** Content for About documents */
interface AboutDocumentData {
    /**
     * Meta Title field in *About*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: about.meta_title
     * - **Tab**: SEO
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    meta_title: prismicT.KeyTextField;
    /**
     * Meta Description field in *About*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: about.meta_description
     * - **Tab**: SEO
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    meta_description: prismicT.KeyTextField;
    /**
     * Meta Author field in *About*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: about.meta_author
     * - **Tab**: SEO
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    meta_author: prismicT.KeyTextField;
    /**
     * Meta Keywords field in *About*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: about.meta_keywords
     * - **Tab**: SEO
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    meta_keywords: prismicT.KeyTextField;
    /**
     * Meta Robots field in *About*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: about.meta_robots
     * - **Tab**: SEO
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    meta_robots: prismicT.KeyTextField;
    /**
     * Slice Zone field in *About*
     *
     * - **Field Type**: Slice Zone
     * - **Placeholder**: *None*
     * - **API ID Path**: about.slices[]
     * - **Tab**: SEO
     * - **Documentation**: https://prismic.io/docs/core-concepts/slices
     *
     */
    slices: prismicT.SliceZone<AboutDocumentDataSlicesSlice>;
    /**
     * Slice Zone field in *About*
     *
     * - **Field Type**: Slice Zone
     * - **Placeholder**: *None*
     * - **API ID Path**: about.slices1[]
     * - **Tab**: Page Content
     * - **Documentation**: https://prismic.io/docs/core-concepts/slices
     *
     */
    slices1: prismicT.SliceZone<AboutDocumentDataSlices1Slice>;
}
/**
 * Slice for *About → Slice Zone*
 *
 */
type AboutDocumentDataSlicesSlice = never;
/**
 * Slice for *About → Slice Zone*
 *
 */
type AboutDocumentDataSlices1Slice = FragmentSlice;
/**
 * About document from Prismic
 *
 * - **API ID**: `about`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type AboutDocument<Lang extends string = string> = prismicT.PrismicDocumentWithUID<Simplify<AboutDocumentData>, "about", Lang>;
/** Content for Contact documents */
interface ContactDocumentData {
    /**
     * Header field in *Contact*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: contact.header
     * - **Tab**: Page Content
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    header: prismicT.KeyTextField;
    /**
     * Subheading field in *Contact*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: contact.subheading
     * - **Tab**: Page Content
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    subheading: prismicT.KeyTextField;
    /**
     * Meta Title field in *Contact*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: contact.meta_title
     * - **Tab**: SEO
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    meta_title: prismicT.KeyTextField;
    /**
     * Meta Author field in *Contact*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: contact.meta_author
     * - **Tab**: SEO
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    meta_author: prismicT.KeyTextField;
    /**
     * Meta Description field in *Contact*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: contact.meta_description
     * - **Tab**: SEO
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    meta_description: prismicT.KeyTextField;
    /**
     * Meta Keywords field in *Contact*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: contact.meta_keywords
     * - **Tab**: SEO
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    meta_keywords: prismicT.KeyTextField;
    /**
     * Meta Robots field in *Contact*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: contact.meta_robots
     * - **Tab**: SEO
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    meta_robots: prismicT.KeyTextField;
}
/**
 * Contact document from Prismic
 *
 * - **API ID**: `contact`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ContactDocument<Lang extends string = string> = prismicT.PrismicDocumentWithUID<Simplify<ContactDocumentData>, "contact", Lang>;
/** Content for Footer documents */
interface FooterDocumentData {
    /**
     * Copy field in *Footer*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: footer.copy
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    copy: prismicT.RichTextField;
    /**
     * logo field in *Footer*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: footer.logo
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/image
     *
     */
    logo: prismicT.ImageField<"desktop">;
    /**
     * Slice Zone field in *Footer*
     *
     * - **Field Type**: Slice Zone
     * - **Placeholder**: *None*
     * - **API ID Path**: footer.slices[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/slices
     *
     */
    slices: prismicT.SliceZone<FooterDocumentDataSlicesSlice>;
}
/**
 * Slice for *Footer → Slice Zone*
 *
 */
type FooterDocumentDataSlicesSlice = LinkIconSlice;
/**
 * Footer document from Prismic
 *
 * - **API ID**: `footer`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type FooterDocument<Lang extends string = string> = prismicT.PrismicDocumentWithUID<Simplify<FooterDocumentData>, "footer", Lang>;
/** Content for Form documents */
interface FormDocumentData {
    /**
     * Name field in *Form*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: form.name
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    name: prismicT.KeyTextField;
    /**
     * SubmitLabel field in *Form*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: form.submitlabel
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    submitlabel: prismicT.KeyTextField;
    /**
     * Slice Zone field in *Form*
     *
     * - **Field Type**: Slice Zone
     * - **Placeholder**: *None*
     * - **API ID Path**: form.slices[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/slices
     *
     */
    slices: prismicT.SliceZone<FormDocumentDataSlicesSlice>;
}
/**
 * Slice for *Form → Slice Zone*
 *
 */
type FormDocumentDataSlicesSlice = TextInputSlice;
/**
 * Form document from Prismic
 *
 * - **API ID**: `form`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type FormDocument<Lang extends string = string> = prismicT.PrismicDocumentWithUID<Simplify<FormDocumentData>, "form", Lang>;
/** Content for FormGroup documents */
interface FormgroupDocumentData {
    /**
     * Name field in *FormGroup*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: formgroup.name
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    name: prismicT.KeyTextField;
    /**
     * Slice Zone field in *FormGroup*
     *
     * - **Field Type**: Slice Zone
     * - **Placeholder**: *None*
     * - **API ID Path**: formgroup.slices[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/slices
     *
     */
    slices: prismicT.SliceZone<FormgroupDocumentDataSlicesSlice>;
}
/**
 * Slice for *FormGroup → Slice Zone*
 *
 */
type FormgroupDocumentDataSlicesSlice = TextInputSlice;
/**
 * FormGroup document from Prismic
 *
 * - **API ID**: `formgroup`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type FormgroupDocument<Lang extends string = string> = prismicT.PrismicDocumentWithUID<Simplify<FormgroupDocumentData>, "formgroup", Lang>;
/** Content for Header documents */
interface HeaderDocumentData {
    /**
     * header field in *Header*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: header.header
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    header: prismicT.KeyTextField;
    /**
     * subheader field in *Header*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: header.subheader
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    subheader: prismicT.KeyTextField;
}
/**
 * Header document from Prismic
 *
 * - **API ID**: `header`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HeaderDocument<Lang extends string = string> = prismicT.PrismicDocumentWithUID<Simplify<HeaderDocumentData>, "header", Lang>;
/** Content for Homepage documents */
interface HomepageDocumentData {
    /**
     * Slice Zone field in *Homepage*
     *
     * - **Field Type**: Slice Zone
     * - **Placeholder**: *None*
     * - **API ID Path**: homepage.slices[]
     * - **Tab**: Page Content
     * - **Documentation**: https://prismic.io/docs/core-concepts/slices
     *
     */
    slices: prismicT.SliceZone<HomepageDocumentDataSlicesSlice>;
    /**
     * Meta Title field in *Homepage*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: homepage.meta_title
     * - **Tab**: SEO
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    meta_title: prismicT.KeyTextField;
    /**
     * Meta Description field in *Homepage*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: homepage.meta_description
     * - **Tab**: SEO
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    meta_description: prismicT.KeyTextField;
    /**
     * Meta Author field in *Homepage*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: homepage.meta_author
     * - **Tab**: SEO
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    meta_author: prismicT.KeyTextField;
    /**
     * Meta Keywords field in *Homepage*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: homepage.meta_keywords
     * - **Tab**: SEO
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    meta_keywords: prismicT.KeyTextField;
    /**
     * Meta Robots field in *Homepage*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: homepage.meta_robots
     * - **Tab**: SEO
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    meta_robots: prismicT.KeyTextField;
}
/**
 * Slice for *Homepage → Slice Zone*
 *
 */
type HomepageDocumentDataSlicesSlice = FragmentSlice;
/**
 * Homepage document from Prismic
 *
 * - **API ID**: `homepage`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomepageDocument<Lang extends string = string> = prismicT.PrismicDocumentWithUID<Simplify<HomepageDocumentData>, "homepage", Lang>;
/** Content for Navigation documents */
interface NavigationDocumentData {
    /**
     * Name field in *Navigation*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: navigation.name
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    name: prismicT.RichTextField;
    /**
     * homePageUrl field in *Navigation*
     *
     * - **Field Type**: Link
     * - **Placeholder**: *None*
     * - **API ID Path**: navigation.homepageurl
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
     *
     */
    homepageurl: prismicT.LinkField;
    /**
     * homePageIcon field in *Navigation*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: navigation.homepageicon
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/image
     *
     */
    homepageicon: prismicT.ImageField<never>;
    /**
     * Slice Zone field in *Navigation*
     *
     * - **Field Type**: Slice Zone
     * - **Placeholder**: *None*
     * - **API ID Path**: navigation.slices[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/slices
     *
     */
    slices: prismicT.SliceZone<NavigationDocumentDataSlicesSlice>;
}
/**
 * Slice for *Navigation → Slice Zone*
 *
 */
type NavigationDocumentDataSlicesSlice = NavigationItemSlice;
/**
 * Navigation document from Prismic
 *
 * - **API ID**: `navigation`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type NavigationDocument<Lang extends string = string> = prismicT.PrismicDocumentWithUID<Simplify<NavigationDocumentData>, "navigation", Lang>;
export type AllDocumentTypes = AboutDocument | ContactDocument | FooterDocument | FormDocument | FormgroupDocument | HeaderDocument | HomepageDocument | NavigationDocument;
/**
 * Primary content in Fragment → Primary
 *
 */
interface FragmentSliceDefaultPrimary {
    /**
     * Header field in *Fragment → Primary*
     *
     * - **Field Type**: Title
     * - **Placeholder**: *None*
     * - **API ID Path**: fragment.primary.header
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    header: prismicT.TitleField;
}
/**
 * Item in Fragment → Items
 *
 */
export interface FragmentSliceDefaultItem {
    /**
     * Content field in *Fragment → Items*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: fragment.items[].content
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    content: prismicT.RichTextField;
}
/**
 * Default variation for Fragment Slice
 *
 * - **API ID**: `default`
 * - **Description**: `Fragment`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type FragmentSliceDefault = prismicT.SharedSliceVariation<"default", Simplify<FragmentSliceDefaultPrimary>, Simplify<FragmentSliceDefaultItem>>;
/**
 * Primary content in Fragment → Primary
 *
 */
interface FragmentSliceHomepageFragmentPrimary {
    /**
     * Header field in *Fragment → Primary*
     *
     * - **Field Type**: Title
     * - **Placeholder**: *None*
     * - **API ID Path**: fragment.primary.header
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    header: prismicT.TitleField;
    /**
     * Placement field in *Fragment → Primary*
     *
     * - **Field Type**: Select
     * - **Placeholder**: *None*
     * - **API ID Path**: fragment.primary.placement
     * - **Documentation**: https://prismic.io/docs/core-concepts/select
     *
     */
    placement: prismicT.SelectField<"Left" | "Right">;
}
/**
 * Item in Fragment → Items
 *
 */
export interface FragmentSliceHomepageFragmentItem {
    /**
     * Content field in *Fragment → Items*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: fragment.items[].content
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    content: prismicT.RichTextField;
}
/**
 * Homepage Fragment variation for Fragment Slice
 *
 * - **API ID**: `homepageFragment`
 * - **Description**: `Fragment`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type FragmentSliceHomepageFragment = prismicT.SharedSliceVariation<"homepageFragment", Simplify<FragmentSliceHomepageFragmentPrimary>, Simplify<FragmentSliceHomepageFragmentItem>>;
/**
 * Primary content in Fragment → Primary
 *
 */
interface FragmentSliceAboutMeFragmentPrimary {
    /**
     * Header field in *Fragment → Primary*
     *
     * - **Field Type**: Title
     * - **Placeholder**: *None*
     * - **API ID Path**: fragment.primary.header
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    header: prismicT.TitleField;
    /**
     * Portrait field in *Fragment → Primary*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: fragment.primary.portrait
     * - **Documentation**: https://prismic.io/docs/core-concepts/image
     *
     */
    portrait: prismicT.ImageField<"tablet" | "desktop">;
}
/**
 * Item in Fragment → Items
 *
 */
export interface FragmentSliceAboutMeFragmentItem {
    /**
     * Content field in *Fragment → Items*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: fragment.items[].content
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    content: prismicT.RichTextField;
}
/**
 * About Me Fragment variation for Fragment Slice
 *
 * - **API ID**: `aboutMeFragment`
 * - **Description**: `Fragment`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type FragmentSliceAboutMeFragment = prismicT.SharedSliceVariation<"aboutMeFragment", Simplify<FragmentSliceAboutMeFragmentPrimary>, Simplify<FragmentSliceAboutMeFragmentItem>>;
/**
 * Slice variation for *Fragment*
 *
 */
type FragmentSliceVariation = FragmentSliceDefault | FragmentSliceHomepageFragment | FragmentSliceAboutMeFragment;
/**
 * Fragment Shared Slice
 *
 * - **API ID**: `fragment`
 * - **Description**: `Fragment`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type FragmentSlice = prismicT.SharedSlice<"fragment", FragmentSliceVariation>;
/**
 * Primary content in Input → Primary
 *
 */
interface TextInputSliceDefaultPrimary {
    /**
     * Name field in *Input → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: text_input.primary.name
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    name: prismicT.KeyTextField;
    /**
     * Label field in *Input → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: text_input.primary.label
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    label: prismicT.KeyTextField;
    /**
     * Placeholder field in *Input → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: text_input.primary.placeholder
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    placeholder: prismicT.KeyTextField;
    /**
     * Required field in *Input → Primary*
     *
     * - **Field Type**: Boolean
     * - **Placeholder**: *None*
     * - **Default Value**: false
     * - **API ID Path**: text_input.primary.required
     * - **Documentation**: https://prismic.io/docs/core-concepts/boolean
     *
     */
    required: prismicT.BooleanField;
    /**
     * RequiredValidationMessage field in *Input → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: text_input.primary.requiredvalidationmessage
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    requiredvalidationmessage: prismicT.KeyTextField;
    /**
     * MinLength field in *Input → Primary*
     *
     * - **Field Type**: Number
     * - **Placeholder**: *None*
     * - **API ID Path**: text_input.primary.minlength
     * - **Documentation**: https://prismic.io/docs/core-concepts/number
     *
     */
    minlength: prismicT.NumberField;
    /**
     * MinLengthValidationMessage field in *Input → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: text_input.primary.minlengthvalidationmessage
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    minlengthvalidationmessage: prismicT.KeyTextField;
    /**
     * MaxLength field in *Input → Primary*
     *
     * - **Field Type**: Number
     * - **Placeholder**: *None*
     * - **API ID Path**: text_input.primary.maxlength
     * - **Documentation**: https://prismic.io/docs/core-concepts/number
     *
     */
    maxlength: prismicT.NumberField;
    /**
     * MaxLengthValidationMessage field in *Input → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: text_input.primary.maxlengthvalidationmessage
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    maxlengthvalidationmessage: prismicT.KeyTextField;
}
/**
 * Default variation for Input Slice
 *
 * - **API ID**: `default`
 * - **Description**: `TextInput`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type TextInputSliceDefault = prismicT.SharedSliceVariation<"default", Simplify<TextInputSliceDefaultPrimary>, never>;
/**
 * Primary content in Input → Primary
 *
 */
interface TextInputSliceTextAreaPrimary {
    /**
     * Name field in *Input → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: text_input.primary.name
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    name: prismicT.KeyTextField;
    /**
     * Label field in *Input → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: text_input.primary.label
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    label: prismicT.KeyTextField;
    /**
     * Placeholder field in *Input → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: text_input.primary.placeholder
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    placeholder: prismicT.KeyTextField;
    /**
     * Required field in *Input → Primary*
     *
     * - **Field Type**: Boolean
     * - **Placeholder**: *None*
     * - **Default Value**: false
     * - **API ID Path**: text_input.primary.required
     * - **Documentation**: https://prismic.io/docs/core-concepts/boolean
     *
     */
    required: prismicT.BooleanField;
    /**
     * RequiredValidationMessage field in *Input → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: text_input.primary.requiredvalidationmessage
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    requiredvalidationmessage: prismicT.KeyTextField;
    /**
     * MinLength field in *Input → Primary*
     *
     * - **Field Type**: Number
     * - **Placeholder**: *None*
     * - **API ID Path**: text_input.primary.minlength
     * - **Documentation**: https://prismic.io/docs/core-concepts/number
     *
     */
    minlength: prismicT.NumberField;
    /**
     * MinLengthValidationMessage field in *Input → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: text_input.primary.minlengthvalidationmessage
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    minlengthvalidationmessage: prismicT.KeyTextField;
    /**
     * MaxLength field in *Input → Primary*
     *
     * - **Field Type**: Number
     * - **Placeholder**: *None*
     * - **API ID Path**: text_input.primary.maxlength
     * - **Documentation**: https://prismic.io/docs/core-concepts/number
     *
     */
    maxlength: prismicT.NumberField;
    /**
     * MaxLengthValidationMessage field in *Input → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: text_input.primary.maxlengthvalidationmessage
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    maxlengthvalidationmessage: prismicT.KeyTextField;
}
/**
 * TextArea variation for Input Slice
 *
 * - **API ID**: `textArea`
 * - **Description**: `TextInput`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type TextInputSliceTextArea = prismicT.SharedSliceVariation<"textArea", Simplify<TextInputSliceTextAreaPrimary>, never>;
/**
 * Primary content in Input → Primary
 *
 */
interface TextInputSliceEmailPrimary {
    /**
     * Name field in *Input → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: text_input.primary.name
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    name: prismicT.KeyTextField;
    /**
     * Label field in *Input → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: text_input.primary.label
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    label: prismicT.KeyTextField;
    /**
     * Placeholder field in *Input → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: text_input.primary.placeholder
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    placeholder: prismicT.KeyTextField;
    /**
     * Required field in *Input → Primary*
     *
     * - **Field Type**: Boolean
     * - **Placeholder**: *None*
     * - **Default Value**: false
     * - **API ID Path**: text_input.primary.required
     * - **Documentation**: https://prismic.io/docs/core-concepts/boolean
     *
     */
    required: prismicT.BooleanField;
    /**
     * RequiredValidationMessage field in *Input → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: text_input.primary.requiredvalidationmessage
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    requiredvalidationmessage: prismicT.KeyTextField;
    /**
     * EmailValidationMessage field in *Input → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: text_input.primary.emailvalidationmessage
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    emailvalidationmessage: prismicT.KeyTextField;
}
/**
 * Email variation for Input Slice
 *
 * - **API ID**: `email`
 * - **Description**: `TextInput`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type TextInputSliceEmail = prismicT.SharedSliceVariation<"email", Simplify<TextInputSliceEmailPrimary>, never>;
/**
 * Slice variation for *Input*
 *
 */
type TextInputSliceVariation = TextInputSliceDefault | TextInputSliceTextArea | TextInputSliceEmail;
/**
 * Input Shared Slice
 *
 * - **API ID**: `text_input`
 * - **Description**: `TextInput`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type TextInputSlice = prismicT.SharedSlice<"text_input", TextInputSliceVariation>;
/**
 * Primary content in LinkIcon → Primary
 *
 */
interface LinkIconSliceDefaultPrimary {
    /**
     * link field in *LinkIcon → Primary*
     *
     * - **Field Type**: Link
     * - **Placeholder**: *None*
     * - **API ID Path**: link_icon.primary.link
     * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
     *
     */
    link: prismicT.LinkField;
    /**
     * icon field in *LinkIcon → Primary*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: link_icon.primary.icon
     * - **Documentation**: https://prismic.io/docs/core-concepts/image
     *
     */
    icon: prismicT.ImageField<never>;
}
/**
 * Default variation for LinkIcon Slice
 *
 * - **API ID**: `default`
 * - **Description**: `LinkIcon`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type LinkIconSliceDefault = prismicT.SharedSliceVariation<"default", Simplify<LinkIconSliceDefaultPrimary>, never>;
/**
 * Slice variation for *LinkIcon*
 *
 */
type LinkIconSliceVariation = LinkIconSliceDefault;
/**
 * LinkIcon Shared Slice
 *
 * - **API ID**: `link_icon`
 * - **Description**: `LinkIcon`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type LinkIconSlice = prismicT.SharedSlice<"link_icon", LinkIconSliceVariation>;
/**
 * Primary content in NavigationItem → Primary
 *
 */
interface NavigationItemSliceDefaultPrimary {
    /**
     * Name field in *NavigationItem → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: This is where it all begins...
     * - **API ID Path**: navigation_item.primary.name
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    name: prismicT.RichTextField;
    /**
     * Link field in *NavigationItem → Primary*
     *
     * - **Field Type**: Link
     * - **Placeholder**: *None*
     * - **API ID Path**: navigation_item.primary.link
     * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
     *
     */
    link: prismicT.LinkField;
}
/**
 * Default variation for NavigationItem Slice
 *
 * - **API ID**: `default`
 * - **Description**: `NavigationItem`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type NavigationItemSliceDefault = prismicT.SharedSliceVariation<"default", Simplify<NavigationItemSliceDefaultPrimary>, never>;
/**
 * Slice variation for *NavigationItem*
 *
 */
type NavigationItemSliceVariation = NavigationItemSliceDefault;
/**
 * NavigationItem Shared Slice
 *
 * - **API ID**: `navigation_item`
 * - **Description**: `NavigationItem`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type NavigationItemSlice = prismicT.SharedSlice<"navigation_item", NavigationItemSliceVariation>;
declare module "@prismicio/client" {
    interface CreateClient {
        (repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
    }
    namespace Content {
        export type { AboutDocumentData, AboutDocumentDataSlicesSlice, AboutDocumentDataSlices1Slice, AboutDocument, ContactDocumentData, ContactDocument, FooterDocumentData, FooterDocumentDataSlicesSlice, FooterDocument, FormDocumentData, FormDocumentDataSlicesSlice, FormDocument, FormgroupDocumentData, FormgroupDocumentDataSlicesSlice, FormgroupDocument, HeaderDocumentData, HeaderDocument, HomepageDocumentData, HomepageDocumentDataSlicesSlice, HomepageDocument, NavigationDocumentData, NavigationDocumentDataSlicesSlice, NavigationDocument, AllDocumentTypes, FragmentSliceDefaultPrimary, FragmentSliceDefaultItem, FragmentSliceDefault, FragmentSliceHomepageFragmentPrimary, FragmentSliceHomepageFragmentItem, FragmentSliceHomepageFragment, FragmentSliceAboutMeFragmentPrimary, FragmentSliceAboutMeFragmentItem, FragmentSliceAboutMeFragment, FragmentSliceVariation, FragmentSlice, TextInputSliceDefaultPrimary, TextInputSliceDefault, TextInputSliceTextAreaPrimary, TextInputSliceTextArea, TextInputSliceEmailPrimary, TextInputSliceEmail, TextInputSliceVariation, TextInputSlice, LinkIconSliceDefaultPrimary, LinkIconSliceDefault, LinkIconSliceVariation, LinkIconSlice, NavigationItemSliceDefaultPrimary, NavigationItemSliceDefault, NavigationItemSliceVariation, NavigationItemSlice };
    }
}
