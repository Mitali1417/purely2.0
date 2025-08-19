import oily from "./assets/Skin/oilyAcneSkin.jpg";
import dry from "./assets/Skin/drySkin.jpg";
import normal from "./assets/Skin/normalSkin.jpg";
import combination from "./assets/Skin/combinationSkin.jpg";
import sensitive from "./assets/Skin/sensitiveSkin.jpg";

export const skinType = [
  {
    id: 1,
    typeName: "Oily Skin",
    image: 'https://www.pexels.com/photo/a-close-up-shot-of-a-woman-s-face-6475987/',
    description: "Feels greasy? See shine by midday?",
    getType: "Hello, oily skin.",
  },
  {
    id: 2,
    typeName: "Dry Skin",
    image: 'https://unsplash.com/photos/left-cheek-of-green-eyed-woman-7YNi8XRryDo',
    description: " Feels tight and sometimes flaky?",
    getType: "That’s dry skin calling.",
  },
  {
    id: 3,
    typeName: "Normal Skin",
    image: 'https://unsplash.com/photos/woman-in-green-shirt-covering-her-face-Y1JzDXSp_wU',
    description: "Feels pretty balanced and trouble-free?",
    getType: "You’ve got normal skin.",
  },
  {
    id: 4,
    typeName: "Combination Skin",
    image: 'https://images.pexels.com/photos/7479953/pexels-photo-7479953.jpeg',
    description: "Yep, that’s combination.",
    getType: "Oily in some spots and dry in others?",
  },
  {
    id: 5,
    typeName: "Sensitive Skin",
    image: 'https://images.pexels.com/photos/5588000/pexels-photo-5588000.jpeg',
    description: "Turns red or stings with new products?",
    getType: "You’re on the sensitive side.",
  },
];

export const luxBrands = [
  {
    id: 1,
    Brand: "Minimalist",
    URL: "https://beminimalist.co/?gad_source=1&gbraid=0AAAAACLkziMNDjRPuTyoeKCJUf6QeI5yn&gclid=CjwKCAjwrcKxBhBMEiwAIVF8rEPIOIAgbuy65rZU3V8s4M8VIcwN3HgVryRNFYp8-_OnxwEY3MCGNBoCXEMQAvD_BwE",
    Logo: "https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/https://beminimalist.co/cdn/shop/files/Minimalist-Logo-PNG-Mid.png?v=1712743274",
  },
  {
    id: 2,
    Brand: "Forest Essentials",
    URL: "https://www.google.com/aclk?sa=l&ai=DChcSEwiWorux_-mFAxUegMIIHRmYA-kYABANGgJqZg&ase=2&gclid=CjwKCAjwrcKxBhBMEiwAIVF8rIBo2eQHaj-gmvrOeJ9o7HxCCpvVZFKF-eZWwpDDP0Ju7b6IHMDhnhoCTKkQAvD_BwE&ei=i-swZtanOOq84-EPrfuG4A0&sig=AOD64_2p4Qf9jy2e1t_NMiWQUwWkKL8p0A&q&sqi=2&nis=4&adurl&ved=2ahUKEwiWmZ-x_-mFAxVq3jgGHa29AdwQ0Qx6BAgREAE",
    Logo: "https://img.forestessentialsindia.com/pub/media/logo/stores/2/FE-Logo_1.png",
  },
  {
    id: 3,
    Brand: "Kama Ayurveda",
    URL: "https://www.instagram.com/kamaayurvedaindia/?utm_source=ig_embed&ig_rid=39fa2716-26d8-49c9-b832-bce23da7c666",
    Logo: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI2LjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxNzcgNDYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE3NyA0NjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNBODY3Mjg7fQo8L3N0eWxlPgo8Zz4KCTxnPgoJCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00NS4zLDM0LjhjMS4xMywwLDEuNDYsMC4zLDAuOSwxLjI2bC0yLjQ5LDQuMjNsLTIuODItNC4zNGMtMC41My0wLjgxLTAuNDMtMS4xNiwwLjk0LTEuMTZ2LTAuMzRoLTQuN3YwLjM0CgkJCWMxLjE1LDAuMDQsMS41NSwwLjI3LDIuNDIsMS42M2wzLjE0LDQuOTF2Mi40OWMwLDAuODctMC4zMSwxLjI2LTEuNDIsMS4yNmgtMC4zM3YwLjM0aDQuODZWNDUuMWgtMC4yMwoJCQljLTEuMDcsMC0xLjQxLTAuMzgtMS40MS0xLjMydi0yLjY0bDIuOTMtNC45NmMwLjQ5LTAuODMsMS0xLjI5LDIuMjEtMS4zOXYtMC4zNEg0NS4zVjM0Ljh6IE02NC45MiwzNC41MQoJCQljMS40NywwLjA2LDEuNzMsMC4zNiwxLjczLDIuMDZ2NC4xMWMwLDMtMi4wMywzLjgyLTQuMDIsMy44MmMtMi42MiwwLTQuMDMtMS40NC00LjAzLTMuODF2LTQuOWMwLTEuMDMsMC40My0xLjI4LDEuNDEtMS4yOGgwLjE1CgkJCXYtMC4zNGgtNC41NHYwLjM0YzEuMiwwLjAxLDEuNTQsMC4xOSwxLjU0LDEuMzF2NS4xNmMwLDIuNTIsMS43Myw0LjQ2LDUuMDksNC40NmMzLjgyLDAsNS4yMi0yLjM3LDUuMjItNC41NHYtNC43OQoJCQljMC0xLjExLDAuNDItMS41OSwxLjYtMS42di0wLjM0aC00LjE0VjM0LjUxeiBNMzAuOCw0My45OWwtMy42OC05LjhoLTEuNTRsMC4xNiwwLjM5bC0zLjIyLDguNzdjLTAuNTUsMS41My0wLjc2LDEuNzMtMS45MSwxLjc1CgkJCXYwLjM0aDQuMDlWNDUuMWgtMC4yOWMtMC45OCwwLTEuNDQtMC4xNy0xLjQ0LTAuNjZjMC0wLjI1LDAuMjMtMC43NywwLjM2LTEuMTFsMS4wMS0yLjc3aDMuNjdsMS4xOCwzLjIyCgkJCWMwLjA3LDAuMTcsMC4xOCwwLjQ0LDAuMTgsMC43MmMwLDAuNDktMC4zNywwLjYtMS4zNiwwLjZoLTAuNDZ2MC4zNGg0Ljg0VjQ1LjFDMzEuNTMsNDUuMSwzMS4xNSw0NC45MywzMC44LDQzLjk5eiBNMjQuNjcsMzkuNzgKCQkJbDEuNTEtNC4xMWwxLjU0LDQuMTFIMjQuNjd6IE01Ny44NywyMy42MWgtMi42NmwtMS45Ni0zLjUzbDIuMjYtNC4yMmgxMC42MWwzLjIsNS42MWwtMS4xNCwyLjE0aC00LjM0djEuMDFIODIuMnYtMS4wMQoJCQljLTIuMTEsMC00LjI0LDAtNS41MS0yLjIxTDY0LjUzLTAuMDJoLTEuNjlMNTIuNTUsMTguNzVjLTIuMiw0LjA0LTQuMjEsNC40Mi02LjYsNC44NnYxLjAxaDExLjkyVjIzLjYxeiBNNjAuNDUsNi43MQoJCQljMC4xMS0wLjE3LDAuMjQtMC4zNywwLjUtMC4zN2MwLjI2LDAsMC4zOSwwLjIsMC40MywwLjM3bDQuMTgsOC4xNWgtOS40Mkw2MC40NSw2LjcxeiBNMTkuNDMsMTIuMDFsNy40Myw5LjM5bC0xLjAyLDIuMjFoLTMuNDYKCQkJdjEuMDFoMTYuOXYtMS4wMWgtMi40N0wyNC44NCw4LjQybDEwLjg0LTYuOTloMi45VjAuNDJIMjIuMnYxLjAxaDIuMTNsMy41NCwzLjY2bC0xNC4xMiw5LjAxVjMuMThsMi4wOS0xLjc2aDIuMzJWMC40MkgwLjk2djEuMDEKCQkJaDMuNTdsMi4yMiwyLjI1djE3LjY1bC0yLjA4LDIuMjhIMC45NnYxLjAxaDE3LjE5di0xLjAxaC0yLjMybC0yLjA5LTIuMDh2LTUuOTlMMTkuNDMsMTIuMDF6IE04NC4yMiw0MS45MwoJCQljLTAuODQtMC44My0xLjM2LTEuMzMtMi4wMS0xLjg0YzEuNDQtMC40MywyLjM2LTEuNTMsMi4zNi0yLjg1YzAtMS44MS0xLjQ4LTMuMTQtNC43NC0zLjE0Yy0xLjE0LDAtMS41LDAtMi4yMywwLjA0CgkJCWMtMC43MiwwLjAzLTEuNzksMC4xLTIuMjIsMC4xdjAuMzRoMC4zOWMxLjAyLDAsMS4zMiwwLjMxLDEuMzIsMS40MXY3LjQzYzAsMS4xOC0wLjM4LDEuNDYtMS40LDEuNDZoLTAuMzJ2MC4zNGg1LjAxdi0wLjM0aC0wLjQKCQkJYy0xLDAtMS40My0wLjI3LTEuNDMtMS4zMnYtMi45OGMwLjI4LDAuMDIsMC41MSwwLjA1LDAuOTEsMC4wNWMwLjQ3LDAsMC43NC0wLjAzLDEuMi0wLjA1YzAuNDIsMC4yOCwxLjAzLDAuOCwxLjgsMS41NmwxLjE5LDEuMTcKCQkJYzEuNTUsMS41NywyLjM0LDIuMjQsNS40MywyLjF2LTAuMzFjLTEuMzYtMC4wOS0yLjQzLTAuNzQtMy40OC0xLjc4TDg0LjIyLDQxLjkzeiBNNzkuNjQsNDAuMjhjLTAuNCwwLTAuNjYsMC4wMi0xLjA5LTAuMDR2LTUuNzkKCQkJYzAuMzItMC4wMywwLjU1LTAuMDMsMC44OC0wLjAzYzIuNzQsMCwzLjQ3LDEuMjcsMy40NywyLjlDODIuOSwzOS40Niw4MS42Miw0MC4yOCw3OS42NCw0MC4yOHogTTE1My40Niw0My45OWwtMy42OS05LjhoLTEuNTUKCQkJbDAuMTcsMC4zOWwtMy4yMSw4Ljc3Yy0wLjU4LDEuNTMtMC43NiwxLjczLTEuOTEsMS43NXYwLjM0aDQuMDlWNDUuMWgtMC4zYy0wLjk2LDAtMS40Mi0wLjE3LTEuNDItMC42NgoJCQljMC0wLjI1LDAuMjMtMC43NywwLjM1LTEuMTFsMS4wMi0yLjc3aDMuNjVsMS4yLDMuMjJjMC4wNiwwLjE3LDAuMTksMC40NCwwLjE5LDAuNzJjMCwwLjQ5LTAuMzgsMC42LTEuMzksMC42aC0wLjQ2djAuMzRoNC44NgoJCQlWNDUuMUMxNTQuMTgsNDUuMSwxNTMuODIsNDQuOTMsMTUzLjQ2LDQzLjk5eiBNMTQ3LjMyLDM5Ljc4bDEuNTEtNC4xMWwxLjU1LDQuMTFIMTQ3LjMyeiBNMTY5LjUsMjEuNEwxNTcuMzUtMC4wMmgtMS43CgkJCWwtMTAuMjgsMTguNzZjLTIuMTksNC4wNC00LjIxLDQuNDItNi42LDQuODZ2MS4wMWgxMS45MXYtMS4wMWgtMi42NGwtMS45Ni0zLjUzbDIuMjctNC4yMmgxMC41OGwzLjIxLDUuNjFMMTYxLDIzLjYxaC00LjM0djEuMDEKCQkJSDE3NXYtMS4wMUMxNzIuOTEsMjMuNjEsMTcwLjc3LDIzLjYxLDE2OS41LDIxLjR6IE0xNDguOTcsMTQuODVsNC4yOC04LjE1YzAuMTMtMC4xNywwLjI2LTAuMzcsMC41MS0wLjM3CgkJCWMwLjI2LDAsMC4zOSwwLjIsMC40NCwwLjM3bDQuMTcsOC4xNUgxNDguOTd6IE0xMzEuODMsMzQuMzFjLTAuOTIsMC0xLjk5LDAtMi45OCwwLjA0Yy0wLjk3LDAuMDMtMS44MiwwLjA4LTIuNDcsMC4xdjAuMzRoMC4zNQoJCQljMS4wNCwwLDEuMzQsMC4yNywxLjM0LDEuNDJ2Ny41OWMwLDEuMDItMC40NCwxLjI5LTEuMzksMS4yOWgtMC4zdjAuMzRIMTMyYzQuNDcsMCw2LjU0LTMuMiw2LjU0LTUuODcKCQkJQzEzOC41NCwzNi42NywxMzYuNDcsMzQuMzEsMTMxLjgzLDM0LjMxeiBNMTM1LjQyLDQzLjY3Yy0xLjA4LDEuMS0yLjA4LDEuNDMtNC40NiwxLjQzYy0xLjM3LDAtMS40NC0wLjI0LTEuNDQtMC45OFYzNC43CgkJCWMwLjIyLTAuMDIsMC42OS0wLjA3LDEuNDEtMC4wN2MyLjQ3LDAsMy43MiwwLjYyLDQuNTMsMS40M2MxLjA1LDEuMDMsMS40MSwyLjQ5LDEuNDEsMy44QzEzNi44OCw0MS42NywxMzYuMDgsNDMuMDMsMTM1LjQyLDQzLjY3CgkJCXogTTEwMC4wMSwzNC41MWMxLjE5LDAsMS42NSwwLjIsMS42NSwwLjc0YzAsMC4yNS0wLjEsMC41OS0wLjMxLDEuMWwtMi43OSw3LjI4bC0zLjE3LTcuOWMtMC4zMi0wLjgsMC4wNS0xLjE3LDEuNjctMS4yMXYtMC4zNAoJCQloLTQuODN2MC4zNGMxLjA2LDAsMS4yOSwwLjI1LDEuNzMsMS4zN2wzLjgsOS41NmgwLjkxbDMuNjEtOS40MWMwLjQzLTEuMDksMC45LTEuNTEsMS44My0xLjUxdi0wLjM0aC00LjFWMzQuNTF6IE0xMTkuMTgsMi42OQoJCQljMC4xOSwwLDAuMzYsMC4wNiwwLjM2LDAuMjV2MTguMzRsLTEuODEsMi4zM2gtMy40MXYxLjAxaDE3Ljc3di0xLjAxaC0zLjY1bC0yLjIxLTIuNTJWMy43NmwyLjU5LTIuMzNoMy4yN1YwLjQyaC0xMy41NAoJCQlsLTcuNDQsMTUuNTdsLTguMjUtMTUuNTdIODguODd2MS4wMWg0LjIxYzEuMTUsMCwxLjY1LDEuMzksMS42NSwyLjE0djE2LjI1bC0zLjAzLDMuNzloLTIuODR2MS4wMWgxMy4xMXYtMS4wMWgtMi4zOWwtMy40Ny0zLjc5CgkJCVYzLjI2YzAtMC4xOSwwLjEzLTAuNDUsMC40NC0wLjQ1YzAuMiwwLDAuMzcsMC4xOSwwLjQ1LDAuMzJsMTEuMDgsMjAuODVoMC41bDEwLjA5LTIxLjA0QzExOC43NCwyLjc1LDExOC45MiwyLjY5LDExOS4xOCwyLjY5egoJCQkgTTExNy43LDQ0Ljc5aC0yLjcxYy0wLjY1LDAtMC45NS0wLjE0LTAuOTUtMC45NnYtMy43N2gyLjk4YzAuNzIsMCwxLjA2LDAuMTQsMS4yMSwxLjRoMC4zM3YtMy4zNWgtMC4zMwoJCQljLTAuMDksMS4wMi0wLjM5LDEuMzItMS4wMiwxLjMyaC0zLjE2VjM1LjFoMy43MmMwLjY0LDAsMS4wNywwLjMxLDEuMzIsMS44aDAuMzFsLTAuMTQtMi40NGgtOC40OHYwLjM0aDAuNAoJCQljMS4xOCwwLDEuNCwwLjQyLDEuNCwxLjQxdjcuNDZjMCwxLjA1LTAuMjMsMS40My0xLjY1LDEuNDNoLTAuNDl2MC4zNGg5LjM2bDAuMjgtMi42NGgtMC4zMgoJCQlDMTE5LjMyLDQ0LjMzLDExOC45Niw0NC43OSwxMTcuNyw0NC43OXoiLz4KCTwvZz4KPC9nPgo8L3N2Zz4K",
  },
  {
    id: 4,
    Brand: "Cetaphil",
    URL: "https://www.cetaphil.com/us/",
    Logo: "https://www.cetaphil.com/on/demandware.static/-/Library-Sites-RefArchSharedLibrary/default/dwbfb7144d/images/cetaphil_logo_resized.png ",
  },
  {
    id: 5,
    Brand: "Soul tree",
    URL: "https://www.soultree.in/?utm_source=google&utm_medium=ET&utm_campaign=%7B%7Bcampaign.name%7D%7D&utm_term=%7B%7Badset.name%7D%7D&utm_content=%7B%7Bad.name%7D%7D&utm_campaign=17725424574&Adgroup=&gclid=CjwKCAjwrcKxBhBMEiwAIVF8rBUP12HcOUmKZTKoeb_3k5Z98l1Jl8MUkayObUGdeVR0GW0OoC1QuxoCbHkQAvD_BwE&Keyword=&Matchtype=&Device=m&Adposition=&Placement=&gad_source=1",
    Logo: "https://www.soultree.in/cdn/shop/files/Logo-new_360x.png?v=1702985758",
  },
  {
    id: 6,
    Brand: "Cure skin",
    URL: "https://cureskin.com/",
    Logo: " https://cureskin.com/wp-content/uploads/2022/12/logo.png",
  },
  {
    id: 7,
    Brand: "Dermafique",
    URL: "https://www.dermafique.com/?gad_source=1&gclid=CjwKCAjwrcKxBhBMEiwAIVF8rHeKOS9sI4eDaxSiiaSqnmqq1y12yvkNLoKxsnYgbYuKs_T7RqxYIhoCJHgQAvD_BwE",
    Logo: "https://cdn.staticans.com/image/catalog/brandstore/Dermafique/554-2023_08_02-Logo_Transparent_512x150__1_.png",
  },
  {
    id: 8,
    Brand: "Kay beauty",
    URL: "https://www.google.com/gasearch?q=kay%20beauty&tbm=&source=sh/x/gs/m2/5",
    Logo: " https://kaybeauty.com/cdn/shop/files/kay-new-logo_140x.png?v=1669097976",
  },
];

export const brandList = [
  {
    id: 1,
    Brand: "Dot & Key",
    ProductName: "Barrier Repair Sunscreen, SPF 50+",
    ProductImage:
      "https://www.dotandkey.com/cdn/shop/files/brsun80_512ade3d-84ad-48db-a2ed-b11a102fbe39.jpg?v=1714460305",
    ProductLink: "https://www.dotandkey.com/products/barrier-repair-sunscreen",
  },
  {
    id: 2,
    Brand: "The Moms Co.",
    ProductName: "Natural Age Control Night Cream (50gm) - Face Care",
    ProductImage:
      "https://files.themomsco.com/site-images/400x400/FOP-4-1-1.jpg",
    ProductLink:
      "https://themomsco.com/product/natural-age-control-night-cream-50gm.html?icid=home_homepage_module-carousel-2_bestsellers_7_natural%20age%20control%20night%20cream%20(50gm)%20-%20face%20care_1",
  },
  {
    id: 3,
    Brand: "Suganda",
    ProductName: "Advanced Pigmentation Serum",
    ProductImage:
      "https://suganda.co/cdn/shop/files/AdvancedPigmentationSerum-30ml_22189b6f-38da-4230-affd-dceff5f92b1b_1280x.jpg?v=1702972680",
    ProductLink: "https://suganda.co/products/advanced-pigmentation-serum",
  },
  {
    id: 4,
    Brand: "Minimalist",
    ProductName: "Frizz Control Complex SPF 30 Hair Serum",
    ProductImage:
      "https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/https://beminimalist.co/cdn/shop/files/Website_homepage_New_Launch_Desktop.png?v=1711630044",
    ProductLink:
      "https://beminimalist.co/?gad_source=1&gbraid=0AAAAACLkziMNDjRPuTyoeKCJUf6QeI5yn&gclid=CjwKCAjwrcKxBhBMEiwAIVF8rEPIOIAgbuy65rZU3V8s4M8VIcwN3HgVryRNFYp8-_OnxwEY3MCGNBoCXEMQAvD_BwE",
  },
  {
    id: 6,
    Brand: "Earth Rhythm",
    ProductName: "Oil Control Face Wash",
    ProductImage:
      "https://earthrhythm.com/cdn/shop/files/DSC_5874.jpg?v=1687937409&width=700",
    ProductLink: "https://earthrhythm.com/products/oil-control-face-wash",
  },
  {
    id: 7,
    Brand: "WishCare",
    ProductName: "Invisible Gel SPF50 Ceramide Sunscreen - PA++++",
    ProductImage:
      "https://www.mywishcare.com/cdn/shop/files/1_5c703ee0-0a1a-4744-b34c-4579cccdb1b6.jpg?v=1706701624&width=600",
    ProductLink:
      "https://www.mywishcare.com/products/invisible-gel-sunscreen-spf50",
  },
  {
    id: 8,
    Brand: "Juicy Chemistry",
    ProductName: "Bulgarian Rose Water (Hydrosol)",
    ProductImage:
      "https://juicychemistry.com/cdn/shop/files/RoseWaterHydrosol_110ml_1595bd3f-f550-4221-8143-69804a580ac1_1024x1024.jpg?v=1693640001",
    ProductLink:
      "https://juicychemistry.com/products/bulgarian-rose-water-toning-mist",
  },
  {
    id: 9,
    Brand: "Pilgrim",
    ProductName: "24K Gold Gel Moisturizer",
    ProductImage:
      "https://discoverpilgrim.com/cdn/shop/files/1_cc8facd6-eff8-4a67-b216-943fdb2858de.png?v=1692630545&width=700",
    ProductLink:
      "https://discoverpilgrim.com/products/24k-gold-gel-moisturizer",
  },
  {
    id: 10,
    Brand: "Forest Essentials",
    ProductName: "Eladi Day Cream With SPF 30",
    ProductImage:
      "https://img.forestessentialsindia.com/pub/media/catalog/product/cache/0ee050c3ffc3555709b9bb6062f4d7e9/s/o/soundarya_radiance_cream_30g_front_copy.png",
    ProductLink:
      "https://www.forestessentialsindia.com/eladi-day-cream-spf-30.html",
  },
  {
    id: 11,
    Brand: "Conscious Chemist",
    ProductName: "Pigmentation & Dark Spot Corrector Gel Cream",
    ProductImage:
      "https://consciouschemist.com/cdn/shop/files/097A8035_2x_717edd24-a6f0-4c11-a633-8921e3ebead5_800x.jpg?v=1695834394",
    ProductLink:
      "https://consciouschemist.com/products/trubiom-cream-pigmentation-corrector",
  },
  {
    id: 12,
    Brand: "Neemli Naturals",
    ProductName: "Retinol & Peptide Serum (30ml)",
    ProductImage:
      "https://www.neemlinaturals.com/cdn/shop/products/30ml-retino-n-pept-serum-scaled.jpg?v=1648645645",
    ProductLink:
      "https://www.neemlinaturals.com/collections/neemli-naturals-skincare-products-for-wrinkles-lines-dullness/products/retinol-peptide-serum",
  },

  {
    id: 14,
    Brand: "Amayra Naturals",
    ProductName: "Soap-Free | Hemp & Aloe Face Wash Cleanser – 100ml",
    ProductImage: "https://amayranatural.in/wp-content/uploads/2020/12/2-7.png",
    ProductLink:
      "https://amayranatural.in/product/soap-free-hemp-seed-oil-face-wash-cleanser-100ml/",
  },
];

export const getCleanser = [
  {
    id: 1,
    Brand: "Skin Kraft",
    ProductName: "Dry Skin Moisturizing Cleanser For Women 60ml",
    ProductImage:
      "https://skinkraft.com/cdn/shop/products/Skinkraft_Moisturizing_Cleanser01_400x400.jpg?v=1681986291",
    ProductLink:
      "https://skinkraft.com/products/skinkraft-moisturizing-cleanser-women",
  },
  {
    id: 2,
    Brand: "Cetphil",
    ProductName: "Gentle Skin Cleanser",
    ProductImage:
      "https://www.cetaphil.com/dw/image/v2/BGGN_PRD/on/demandware.static/-/Sites-galderma-us-m-catalog/default/dw98a935d4/Gentle%20Skin%20Cleanser%2016z/gentle%20skin%20cleanser.png?sw=900&sh=900&sm=fit&q=85",
    ProductLink:
      "https://www.cetaphil.com/us/cleansers/gentle-skin-cleanser/302990110227.html",
  },
  {
    id: 3,
    Brand: "Dr. Sheths",
    ProductName: "Ceramide Vitamin C Face Wash",
    ProductImage:
      "https://www.drsheths.com/cdn/shop/products/13.jpg?v=1681463123",
    ProductLink:
      "https://www.drsheths.com/products/ceramide-vitamin-c-face-wash-100g?utm_source=google&utm_medium=cpc&utm_campaign=20357453165&utm_agid=&utm_term=&creative=&gad_source=1&gclid=CjwKCAjwrcKxBhBMEiwAIVF8rGw2VKesI3GLZUvcJIszLUjzzd7q7z_LRyywZJnsbZTNDFBnxVNkZhoCD-MQAvD_BwE",
  },
  {
    id: 4,
    Brand: "The Derma Co",
    ProductName: "Face Wash",
    ProductImage:
      "https://images.thedermaco.com/catalog/product/1/s/1st_1_1.jpg?auto=format&fit=contain&width=720&auto=compress",
    ProductLink:
      "https://thedermaco.com/product/1-salicylic-acid-gel-face-wash-the-dermaco-100ml?utm_source=google&utm_medium=cpc&utm_term=152590011100&utm_content=667100640369&gad_source=1&gclid=CjwKCAjwrcKxBhBMEiwAIVF8rLgQR-mnQcNSCC8J25m_0iEjGjAAnrpZ3a5AurwjxN1pIUsisw5moBoCNAgQAvD_BwE",
  },
  // {
  //   id: 5,
  //   Brand: "Foxtale",
  //   ProductName: "Hydrating Face Wash Size -100 ml",
  //   ProductImage:
  //     "https://foxtale.in/cdn/shop/files/PDP---First-Image-04.jpg?v=1712244125&width=600",
  //   ProductLink: "https://foxtale.in/products/the-daily-duet-cleanser",
  // },
  {
    id: 6,
    Brand: "Minimalist",
    ProductName: "Salicylic + LHA 2% Cleanser",
    ProductImage:
      "https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/https://beminimalist.co/cdn/shop/products/18-min.png?crop=center&height=1260&v=1679317872&width=840",
    ProductLink: "https://beminimalist.co/products/salicylic-lha-2-cleanser",
  },
  {
    id: 7,
    Brand: "Dermafique",
    ProductName: "Vitality Flash Facial Cleanser 100ml",
    ProductImage:
      "https://cdn.staticans.com/image/tr:e-sharpen-01,h-1440,w-1080,cm-pad_resize/data/dermafique/468-2023_02_21-474486568_vitality_flash_facial_cleanser_for_normal_to_oily_skin_exfoliates_dead_cells_soap_free.png",
    ProductLink:
      "https://www.dermafique.com/dermafique-facewash/vitality-flash-exfoliating-facial-cleanser-normal-to-oily-skin-cleanses-pores-removes-oil-exfoliates-dead-cells-soap-free-100ml",
  },
  {
    id: 8,
    Brand: "Wow Skin Science",
    ProductName: "Green Tea Face Wash",
    ProductImage:
      "https://media.buywow.in/public/products/13386f42-1c41-448e-b7b9-ebb7ab1d9cd4/variants/6d2d3329-d1d7-4699-91c1-09a40eeca287-0.jpg?w=640&q=75",
    ProductLink:
      "https://www.buywow.in/products/green-tea-face-wash-with-built-in-brush",
  },
  {
    id: 9,
    Brand: "Dot & Key",
    ProductName: "Cica & Salicylic Face Wash",
    ProductImage:
      "https://www.dotandkey.com/cdn/shop/files/CICAfw_1800x1800.jpg?v=1705741695",
    ProductLink:
      "https://www.dotandkey.com/collections/face-wash/products/cica-calming-blemish-clearing-face-wash",
  },
  {
    id: 10,
    Brand: "Kimirica",
    ProductName: "Brightening + Hydration Face wash",
    ProductImage:
      "https://www.kimirica.shop/cdn/shop/files/BrighteningFaceWash_Website_Listing-Sep-23-01.jpg?v=1696315228&width=700",
    ProductLink:
      "https://www.kimirica.shop/products/brightening-hydrating-face-wash",
  },
  {
    id: 11,
    Brand: "Organic Harvest",
    ProductName:
      "Brightening Foaming Face Wash Kakadu Plum & Acai Berry - 100g",
    ProductImage:
      "https://www.organicharvest.in/_next/image?url=https%3A%2F%2Ffiles.organicharvest.in%2Fsite-images%2F800x800%2F1-1x.jpg&w=384&q=75",
    ProductLink:
      "https://www.organicharvest.in/product/brightening-foaming-face-wash-kakadu-plum-acai-berry-100g.html",
  },
  {
    id: 12,
    Brand: "Good Vibes",
    ProductName: "Rejuvenating Face Wash - Pomegranate",
    ProductImage:
      "https://www.goodvibesonly.in/cdn/shop/products/GVpomegranate_facewash_540x.jpg?v=1681909804",
    ProductLink:
      "https://www.goodvibesonly.in/products/rejuvenating-face-wash-pomegranate-200-ml-1?_pos=1&_sid=07ae36cd3&_ss=r",
  },
];

export const getMoisturizer = [
  {
    id: 1,
    Brand: "Cetaphil",
    ProductName: "DAILY OIL-FREE FACIAL MOISTURIZER SPF 35",
    ProductImage:
      "https://www.cetaphil.com/dw/image/v2/BGGN_PRD/on/demandware.static/-/Sites-galderma-us-m-catalog/default/dwe456f50b/Daily%20Facial%20Moisturizer%20SPF%2035,/CETAPHIL_Daily_Oil-Free_Facial_Moisturizer_SPF35.png?sw=900&sh=900&sm=fit&q=85",
    ProductLink:
      "https://www.cetaphil.com/us/moisturizers/daily-oil-free-facial-moisturizer-spf-35/302994113002.html",
  },
  {
    id: 2,
    Brand: "Dr. Sheths",
    ProductName: "Ceramide & Vitamin C Brightening Oil-Free Moisturizer - 50g",
    ProductImage:
      "https://www.drsheths.com/cdn/shop/files/CVCOFM.png?v=1689592980",
    ProductLink:
      "https://www.drsheths.com/collections/moisturize/products/ceramide-vitamin-c-oil-free-moisturizer-50g",
  },
  {
    id: 3,
    Brand: "Derma Co",
    ProductName:
      "5% Vitamin C Oil-Free Daily Face Moisturizer for Skin Radiance - 100g",
    ProductImage:
      "https://images.thedermaco.com/catalog/product/1/_/1._2.jpg?auto=format&fit=contain&width=720&auto=compress",
    ProductLink:
      "https://thedermaco.com/product/5-vitamin-c-oil-free-daily-face-moisturizer-for-skin-radiance-100g",
  },
  // {
  //   id: 4,
  //   Brand: "Foxtale",
  //   ProductName: "Hydrating Moisturizer with Ceramide Size -50 ml",
  //   ProductImage:
  //     "https://foxtale.in/cdn/shop/files/PDP---First-Image-09.jpg?v=1712244190&width=600",
  //   ProductLink:
  //     "https://foxtale.in/products/ceramide-supercream?_pos=2&_sid=353515def&_ss=r&_gl=1*sytxwl*_up*MQ..&gclid=CjwKCAjwrcKxBhBMEiwAIVF8rKKqIfLw0mB7Zbeoxn_YzQIO1xAnNNPeNY2fSNUN1BbBCaa3ZvqtfhoCGUcQAvD_BwE",
  // },
  {
    id: 5,
    Brand: "Minimalist",
    ProductName: "Sepicalm 3% Moisturizer",
    ProductImage:
      "https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/https://beminimalist.co/cdn/shop/products/SepicalmMoisturizer1200-2.png?crop=center&height=1260&v=1646471109&width=840",
    ProductLink:
      "https://beminimalist.co/collections/face-moisturizer/products/sepicalm-3-oat-moisturiser",
  },
  {
    id: 6,
    Brand: "Aqualogica",
    ProductName:
      "Glow+ Oil Free Moisturizer with Papaya & Vitamin C for Glowing Skin - 100g",
    ProductImage:
      "https://aqualogica.in/cdn/shop/files/GLOWOFMFOP.jpg?v=1701845506&width=713",
    ProductLink:
      "https://aqualogica.in/products/glow-oil-free-moisturizer-100g-1",
  },
  {
    id: 7,
    Brand: "Dermafique",
    ProductName: "Advanced Hydration Day Cream 50g",
    ProductImage:
      "https://cdn.staticans.com/image/tr:e-sharpen-01,h-1440,w-1080,cm-pad_resize/data/dermafique/249-2022_05_05-PDFCR0008_1.jpg",
    ProductLink:
      "https://www.dermafique.com/facecream-moisturizer/advanced-hydration-day-cream-all-skin-types-with-10x-vitamin-e-anti-oxidant-protection-nourishing-moisturizer-alcohol-free-50g",
  },
  {
    id: 8,
    Brand: "Wow Skin Science",
    ProductName: "Apple Cider Vinegar Face Moisturizer - 100 Ml",
    ProductImage:
      "https://media.buywow.in/public/products/ba052ff5-0a8e-477d-a030-0333138833a3/ba052ff5-0a8e-477d-a030-0333138833a3-0.jpg?w=640&q=75",
    ProductLink:
      "https://www.buywow.in/products/wow-skin-science-apple-cider-vinegar-oil-free-face-moisturizer-100-ml-tube",
  },
  {
    id: 9,
    Brand: "Dot & Key",
    ProductName: "Barrier Repair Face Moisturizer with Ceramides",
    ProductImage:
      "https://www.dotandkey.com/cdn/shop/files/image_5_b9901d9d-5e11-4876-8fed-3cbec943e24e_1800x1800.png?v=1714542685",
    ProductLink:
      "https://www.dotandkey.com/collections/moisturizers/products/dot-key-ceramides-hyaluronic-hydrating-face-cream-i-repairs-skin-barrier-intense-moisturization-sensitive-dry-skin-fragrance-free",
  },

  {
    id: 11,
    Brand: "Good Vibes",
    ProductName: "Rice Brightening Gel Creme",
    ProductImage:
      "https://www.goodvibesonly.in/cdn/shop/products/good-vibes-brightening-rice-gel-creme-50-g_8_display_1632923445_70c20fb5_540x.jpg?v=1678771989",
    ProductLink:
      "https://www.goodvibesonly.in/products/brightening-rice-gel-creme-50-g",
  },
  {
    id: 12,
    Brand: "Re'equil",
    ProductName: "Ceramide & Hyaluronic Acid Moisturiser",
    ProductImage:
      "https://www.reequil.com/cdn/shop/files/CeramideHyaluronicAcidMoisturiser100g_2.png?v=1706527671&width=713",
    ProductLink:
      "https://www.reequil.com/products/ceramide-hyaluronic-acid-moisturiser-for-normal-to-dry-skin",
  },
  {
    id: 13,
    Brand: "Skin Kraft",
    ProductName: "Ultra Matte Creme Gel - SPF 40 For Slightly Oily Skin 50ml",
    ProductImage:
      "https://skinkraft.com/cdn/shop/files/UltraMatteSheerCremeGel_f3ec06c7-10fe-432a-acb3-9951ce548f46_400x400.jpg?v=1697797540",
    ProductLink:
      "https://skinkraft.com/products/ultra-matte-sheer-creme-gel-spf-40",
  },
];

// export const getCategory = [
//   {
//     id: 1,
//     categoryName: "Face",
//     categoryImg:
//       "https://images.pexels.com/photos/6811386/pexels-photo-6811386.jpeg?auto=compress&cs=tinysrgb&w=600",
//   },
//   {
//     id: 2,
//     categoryName: "Hair",
//     categoryImg:
//       "https://images.pexels.com/photos/7440131/pexels-photo-7440131.jpeg?auto=compress&cs=tinysrgb&w=600",
//   },
//   {
//     id: 3,
//     categoryName: "Body",
//     categoryImg:
//       "https://images.pexels.com/photos/4156343/pexels-photo-4156343.jpeg?auto=compress&cs=tinysrgb&w=600",
//   },
//   {
//     id: 4,
//     categoryName: "Makeup",
//     categoryImg:
//       "https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=600",
//   },
// ];

// export const userCategoryForm = [
//   {
//     id: 1,
//     categoryName: "Face",
//     ques1: "What is your Skintype? Normal, Combination, Oily, Dry, Sensitive",
//     ques2:
//       "What is your skincare concern? (eg. acne-prone, pigmentation, anti-aging, dark circles, pigmented lips)",
//     ques3: "Preference - Indian or International",
//     ques4: "What is your budget?",
//   },
//   {
//     id: 2,
//     categoryName: "Hair",
//     ques1: "What is your Scalp type? Dry, Oily, Daqndruff prone",
//     ques2:
//       "What is your haircare concern? (eg. Hair loss, Hair regrowth, Damaged Hair, curly hair, Flaky Scalp)",
//     ques3: "Preference - Indian or International",
//     ques4: "What is your budget?",
//   },
//   {
//     id: 3,
//     categoryName: "Body",
//     ques1: "What is your body type? (eg. strawberry skin)",
//     ques2:
//       "What is your body's concern? (eg. Keratosis pilaris, Dark neck, Dark Underarms, Dark Knuckles, Dark Inner thighs, Dark elbows & knees, cracked feet, Back Acne, Body odour)",
//     ques3: "Preference - Indian or International",
//     ques4: "What is your budget?",
//   },
//   {
//     id: 4,
//     categoryName: "Makeup",
//     ques1: "What is your Skintype? Normal, Combination, Oily, Dry, Sensitive",
//     ques2:
//       "Select the category: Lips, Eyes, Eyebrow, Base (eg. foundation, concelor, primer)",
//     ques3: "Preference - Indian or International",
//     ques4: "What is your budget?",
//   },
// ];