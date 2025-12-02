import { CityData } from '../types';

const PLACEHOLDER_DATA: CityData = {
  cityName: "Barcelona",
  categories: [
    {
      id: "eat",
      title: "Eat",
      imageKeyword: "luxury fine dining dish",
      places: [
        {
          name: "Cocina Hermanos Torres",
          description: "An industrial cathedral of culinary excellence with 3 Michelin stars.",
          fullDescription: "Imagine a restaurant that feels like a spaceship of gastronomy. Located in an old tire warehouse, this 3-Michelin-star venue places the open kitchen at the absolute center of the room - there are no walls, no secrets, just pure performance. It is sleek, dark, and undeniably sexy.",
          nycConnectionText: "• Channels the energy of **The Modern** or **Chef's Table at Brooklyn Fare** - where the kitchen is the stage.\n• Industrial-chic architecture that feels right at home in West Chelsea.\n• A dining experience that is as much theater as it is dinner.",
          mustTry: "• The 'Onion Soup' reinvention - a dish that defies physics and expectation.\n• The pairing menu, which highlights rare Spanish wines.",
          nycEquivalent: "The Modern",
          location: "C/ de Taquígraf Serra, 20",
          vibe: "Industrial High-Tech",
          imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxtFeKR-stdgYcKoMWqcpf0-7QcLjqiYr2G06EvJHrLvWpL_L5WGYdoCyZfOBXHq77Dj97JDuhFW54MaIirkqpRM6FhWINaF3pgqOFp5C4f0fij-9hzBT3FiqEgg-RG7u8khfWu_mZ6g6zC=s800-w800-h600-rw"
        },
        {
          name: "Via Veneto",
          description: "Barcelona's most historic dining room, where Dali once dined.",
          fullDescription: "Step into a time capsule of Belle Epoque luxury. Since 1967, Via Veneto has defined Barcelona's upper crust dining. With its amber lighting, velvet banquettes, and impeccable service, it is the definition of 'Old Money' aesthetic. Salvador Dali considered this his second home.",
          nycConnectionText: "• It is the spiritual twin of **The Grill** (formerly The Four Seasons) - timeless power dining.\n• A place where deals are made over white tablecloths and heavy silverware.\n• Impeccable, old-school service that is rare to find today.",
          mustTry: "• The Pressed Duck (Canard a la Presse) - carved tableside with surgical precision.\n• Exploring their legendary wine cellar if you ask nicely.",
          nycEquivalent: "The Grill",
          location: "C/ de Ganduxer, 10",
          vibe: "Timeless Power",
          imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSymIR_P9gX6iRpecxOy7zMjtwM2PQ1koQGkUJp-xeOBYu5_uQ4nK67SqjzGS3VW8I0JpmQwl1Na6gJ9_bk3mr3AGAcNy_I06m4KzmDTRUCn92iHqmmz0bNGpxJq2kkmnfD3ESPO=s800-w800-h600-rw"
        },
        {
          name: "VICIO",
          description: "Barcelona's Own Smashburger Moment.",
          fullDescription: "VICIO is Barcelona's cultural phenomenon of a burger joint - fast, bold, addictive, and unapologetically fun. Think neon attitude, crisp smashburgers, and that unmistakable 'if you know, you know' hype that only the best city spots create. It feels like the kind of place New Yorkers line up for at midnight: simple idea, executed with swagger. If Shake Shack had a rebellious Barcelona cousin, this would be it.",
          nycConnectionText: "• Captures the smashburger culture of **Shake Shack** / **5 Napkin Burger**.\n• Young, electric, diverse crowd - pure Lower East Side energy.\n• Modern brand attitude that feels instantly iconic.",
          mustTry: "• The VICIO Cheeseburger is the play.\n• Add truffle fries or their seasonal sauces.",
          nycEquivalent: "Shake Shack",
          location: "Via Augusta, 21",
          vibe: "Smashburger Cult",
          imageUrl: "https://raw.githubusercontent.com/marcelorm81/assets/350507a52497ccc34df117d862bd8fd6fa983c7e/vicio.jpg"
        },
        {
          name: "Pastrami Bar",
          description: "Barcelona's NYC Deli Bite.",
          fullDescription: "Pastrami Bar is Barcelona's little slice of New York nostalgia - juicy pastrami stacked high, mustard dripping down the side, and that unmistakable smell of smoked meat that makes you feel like you just stepped off Houston Street. It's casual, loud in the best way, and always full of people convinced they've found the city's best sandwich. This is Barcelona's tribute to the deli culture that shaped New York food history.",
          nycConnectionText: "• Direct spiritual twin to **Katz's** - iconic pastrami, zero pretension, full flavor.\n• Same 'line out the door' neighborhood energy as NYC's classic Jewish delis.\n• Big sandwiches, fast service, and that busy-lunch buzz unique to Manhattan.",
          mustTry: "• Get the classic pastrami sandwich - no need to overthink it.\n• Order extra pickles - they complete the experience.",
          nycEquivalent: "Katz's Deli",
          location: "C/ de Rera Palau, 4",
          vibe: "Nostalgic Deli",
          imageUrl: "https://media.timeout.com/images/103067250/image.jpg"
        }
      ]
    },
    {
      id: "drink",
      title: "Drink",
      imageKeyword: "luxury cocktail bar dark",
      places: [
        {
          name: "Paradiso",
          description: "A speakeasy hidden behind a pastrami shop fridge door.",
          fullDescription: "To enter, you walk through a working Pastrami shop and open an antique refrigerator door. Inside, you find a cavernous, wooden interior reminiscent of a Dali painting. It was voted the #1 Bar in the World, and the theatricality of the drinks matches the hype.",
          nycConnectionText: "• The ultimate **Please Don't Tell (PDT)** experience, dialed up to eleven.\n• Hidden entrance through an unassuming storefront.\n• Cocktails that are served with elaborate, surreal presentations.",
          mustTry: "• The 'Supercool Martini' - served with an iceberg cultivated in the glass.\n• A sandwich from the front shop before you enter.",
          nycEquivalent: "PDT",
          location: "C/ de Rera Palau, 4",
          vibe: "Hidden Theatricality",
          imageUrl: "https://images.squarespace-cdn.com/content/v1/62f1252f8bfa06437d10ed94/9af8e77a-bab8-414f-a24f-74f2f5dcaf52/Paradiso+Barcelona.jpeg"
        },
        {
          name: "Sips",
          description: "High-concept mixology without the pretension.",
          fullDescription: "There is no bar counter here - the mixologists work at central islands, removing the barrier between creator and guest. It feels like a high-end fashion boutique that happens to serve world-class liquid art.",
          nycConnectionText: "• Similar to **Double Chicken Please** in the LES - innovative and design-forward.\n• Removes the physical barrier between bartender and guest.\n• A bustling, modern energy focused purely on flavor.",
          mustTry: "• The 'Krypta' - served in an olfactory chamber that you breathe in while drinking.\n• Watching the island workstation in action.",
          nycEquivalent: "Double Chicken Please",
          location: "C/ de Muntaner, 108",
          vibe: "Liquid Art"
        },
        {
          name: "Dr. Stravinsky",
          description: "An alchemist's lab of fermented and distilled wonders.",
          fullDescription: "Walking into Dr. Stravinsky feels like entering an old apothecary. Jars of pickling fruits and herbs line the walls. They distill their own spirits and ferment their own ingredients. It is moody, dark, and smells of mysterious herbs.",
          nycConnectionText: "• Channels **Apotheke** in Chinatown - dark, scientific, and moody.\n• Obsessed with the chemistry and botany of the perfect drink.\n• The interior feels like a secret laboratory from the 19th century.",
          mustTry: "• The 'Camp Nou' - a tribute to the city using local botanicals.\n• Asking the bartender about their house-made ferments.",
          nycEquivalent: "Apotheke",
          location: "C/ dels Mirallers, 5",
          vibe: "Alchemy Lab"
        },
        {
          name: "Two Schmucks",
          description: "A five-star dive bar with chaotic energy.",
          fullDescription: "Located in the gritty-cool Raval district, this self-proclaimed 'five-star dive bar' serves world-class cocktails in a setting that feels like a punk rock squat. The music is loud, the staff is tattooed, and the drinks are perfection.",
          nycConnectionText: "• The spirit of **Attaboy** or a high-end **Welcome to the Johnsons**.\n• Elite quality drinks served with zero pretension.\n• A loud, energetic atmosphere that welcomes chaos.",
          mustTry: "• The 'Clean Cut Mojito' - crystal clear and dangerously drinkable.\n• Staying late when the energy shifts from bar to party.",
          nycEquivalent: "Attaboy",
          location: "C/ de Joaquín Costa, 52",
          vibe: "Punk Elegance"
        }
      ]
    },
    {
      id: "dance",
      title: "Dance",
      imageKeyword: "nightclub party crowd",
      places: [
        {
          name: "Opium",
          description: "Beach club by day, superclub by night with international DJs.",
          fullDescription: "Located right on the Barceloneta boardwalk, Opium is the heavy hitter of Barcelona nightlife. It's glossy, expensive, and packed with beautiful people. The terrace opens onto the sand, making it one of the few places you can dance until sunrise and walk straight into the Mediterranean.",
          nycConnectionText: "• A direct twin to **Marquee** or **Lavo** - big room energy.\n• Bottle service, sparklers, and international headliners.\n• The place to see and be seen on a Saturday night.",
          mustTry: "• Booking a VIP table on the terrace for the transition from night to sunrise.\n• Walking onto the beach immediately after leaving.",
          nycEquivalent: "Marquee",
          location: "Passeig Marítim, 34",
          vibe: "Glossy Superclub",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Opium_Mar.jpg/800px-Opium_Mar.jpg"
        },
        {
          name: "Sala Apolo",
          description: "An old theater turned indie nightlife temple.",
          fullDescription: "Apolo is an institution. Housed in an early 20th-century dance hall with red velvet interiors and wooden balconies, it hosts everything from grime to techno to indie rock. It feels gritty, historic, and undeniably authentic.",
          nycConnectionText: "• Think **Webster Hall** before the renovations - historic bones.\n• Sticky floors and the best live acts in the city.\n• A diverse crowd ranging from indie rockers to techno heads.",
          mustTry: "• 'Nasty Mondays' - the legendary weeknight party locals swear by.\n• Watching a show from the upper wooden balcony.",
          nycEquivalent: "Webster Hall",
          location: "C/ Nou de la Rambla, 113",
          vibe: "Indie Cult",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Joan_Daus%C3%A0%2C_Sala_Apolo_2015%2C_Matinals_%28107%29.png"
        },
        {
          name: "Sutton",
          description: "Where celebrities and the elite come to play.",
          fullDescription: "Sutton is strictly high-end. The dress code is strict, the bottles are oversized, and the crowd is international jet-set. It is the place to go when you want to dress up and spend money.",
          nycConnectionText: "• Pure **1 OAK** energy - it's about the door policy.\n• VIP tables dominate the space and the vibe.\n• A favorite for visiting celebrities and footballers.",
          mustTry: "• The main VIP area is the only way to truly experience it.\n• Arriving late (after 2 AM) when the party peaks.",
          nycEquivalent: "1 OAK",
          location: "C/ de Tuset, 13",
          vibe: "Exclusive Glamour"
        },
        {
          name: "Razzmatazz",
          description: "A massive industrial labyrinth of sound.",
          fullDescription: "Five rooms, one massive building. Razzmatazz is a rite of passage. It's a confusing, sweating, pounding maze of music that ranges from indie rock to heavy techno. You will get lost, and that's the point.",
          nycConnectionText: "• Resonates with **Brooklyn Mirage** or **Avant Gardner** - massive scale.\n• An industrial setting that feels like a festival every weekend.\n• Multiple rooms offering completely different vibes.",
          mustTry: "• The rooftop terrace between sets to cool down.\n• Trying to visit all 5 rooms in a single night.",
          nycEquivalent: "Avant Gardner",
          location: "C/ dels Almogàvers, 122",
          vibe: "Industrial Maze"
        }
      ]
    },
    {
      id: "culture",
      title: "Culture",
      imageKeyword: "barcelona architecture gaudi",
      places: [
        {
          name: "Palau de la Musica",
          description: "The only concert hall in the world declared a UNESCO World Heritage Site.",
          fullDescription: "A modernist explosion of color, light, and mosaic. The main concert hall features a stunning inverted stained-glass skylight representing the sun. It is overwhelming in its beauty and acoustic perfection.",
          nycConnectionText: "• It holds the prestige and acoustic reverence of **Carnegie Hall**.\n• A visually stunning, psychedelic Art Nouveau shell.\n• A bucket-list venue for performers and audiences alike.",
          mustTry: "• A daytime architectural tour to see the skylight in natural brilliance.\n• Catching a classical guitar concert for the full acoustic effect.",
          nycEquivalent: "Carnegie Hall",
          location: "C/ Palau de la Música, 4-6",
          vibe: "Frozen Music",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Palau_de_la_M%C3%BAsica_Catalana%2C_the_Catalan_Concert_Hall.jpg/800px-Palau_de_la_M%C3%BAsica_Catalana%2C_the_Catalan_Concert_Hall.jpg"
        },
        {
          name: "MNAC",
          description: "A palace of art overlooking the entire city.",
          fullDescription: "Perched high on Montjuic, the Museu Nacional d'Art de Catalunya is housed in a massive palace built for the 1929 World Expo. The walk up the grand stairs, past the magic fountains, offers one of the most dramatic arrivals of any museum in the world.",
          nycConnectionText: "• The sheer scale and grand staircase echo **The Metropolitan Museum of Art (The Met)**.\n• Houses an encyclopedic collection of the region's art.\n• A monumental building that dominates the city landscape.",
          mustTry: "• Watching the sunset from the front steps before heading inside.\n• The Romanesque frescoes, which are unique in the world.",
          nycEquivalent: "The Met",
          location: "Palau Nacional, Parc de Montjuïc",
          vibe: "Imperial Grandeur",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/MNAC-_Sales_009.JPG/800px-MNAC-_Sales_009.JPG"
        },
        {
          name: "MACBA",
          description: "The white pearl of the Raval district.",
          fullDescription: "Richard Meier's gleaming white modernist building stands in stark contrast to the gritty medieval streets of El Raval. Outside, it's the world's most famous skate spot; inside, it houses cutting-edge contemporary art.",
          nycConnectionText: "• A direct link to **MoMA PS1** - architecturally distinct.\n• Surrounded by urban youth culture and skaters.\n• Focuses on cutting-edge, often experimental contemporary art.",
          mustTry: "• Sitting in the plaza outside to watch the skaters.\n• The rotating temporary exhibitions on the top floor.",
          nycEquivalent: "MoMA PS1",
          location: "Plaça dels Àngels, 1",
          vibe: "Urban Contemporary"
        },
        {
          name: "Casa Vicens",
          description: "Gaudi's first house and hidden gem.",
          fullDescription: "Before the Sagrada Familia, there was Casa Vicens. It is an orientalist fantasy of red brick and green tiles. Recently opened to the public, it feels intimate and domestic compared to his larger works.",
          nycConnectionText: "• Reminiscent of the **Neue Galerie** - a jewel-box museum.\n• Feels intimate, like stepping into a private, eccentric home.\n• Stunning, distinctive architecture on a smaller scale.",
          mustTry: "• The smoking room with its intricate papier-mache ceiling.\n• The rooftop tiles which are perfect for photography.",
          nycEquivalent: "Neue Galerie",
          location: "C/ de les Carolines, 20",
          vibe: "Orientalist Jewel"
        }
      ]
    },
    {
      id: "shop",
      title: "Shop",
      imageKeyword: "luxury fashion shopping bag",
      places: [
        {
          name: "Passeig de Gracia",
          description: "The golden mile of modernist architecture and luxury fashion.",
          fullDescription: "This is not just a street; it is an open-air museum of Modernisme architecture that happens to house the world's most exclusive brands. You shop for Loewe, Chanel, and Gucci while standing in the shadow of Gaudi's Casa Batllo and Casa Mila.",
          nycConnectionText: "• The undisputed twin of **Fifth Avenue** - high fashion and energy.\n• Architectural icons sits side-by-side with luxury flagships.\n• Wide sidewalks perfect for a leisurely shopping stroll.",
          mustTry: "• The Loewe flagship store at Casa Lleo Morera.\n• Looking up at the lamp posts, designed by Gaudi himself.",
          nycEquivalent: "Fifth Avenue",
          location: "Passeig de Gràcia",
          vibe: "Architectural Luxury",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Pgracia.JPG/800px-Pgracia.JPG"
        },
        {
          name: "Vasquiat",
          description: "Curated space for emerging designers.",
          fullDescription: "Founded by industry insiders, Vasquiat feels less like a store and more like the closet of your coolest friend. It focuses on pre-ordering collections and discovering under-the-radar designers before they blow up.",
          nycConnectionText: "• Matches the energy of **Dover Street Market** - cool and curated.\n• Focuses on discovery rather than just established luxury.\n• A space that feels forward-thinking and trend-setting.",
          mustTry: "• Checking their 'Room' selection for unique pieces.\n• Asking the staff about the next big local designer.",
          nycEquivalent: "Dover Street Market",
          location: "C/ de Provença, 243",
          vibe: "Trendsetter Haven",
          imageUrl: "https://raw.githubusercontent.com/marcelorm81/assets/6bddbc746591895695a03f26e7937ac2adb3c705/vasquiat.jpg"
        },
        {
          name: "Santa Eulalia",
          description: "The grand dame of Barcelona luxury.",
          fullDescription: "Since 1843, Santa Eulalia has defined elegance in Barcelona. It is an emporium of high-end fashion with a bespoke tailoring service and a champagne bar. The service is white-glove and old-world.",
          nycConnectionText: "• Twin to **Bergdorf Goodman** - historic and exclusive.\n• Offers a level of service that feels from another era.\n• A multi-brand luxury department store with deep roots.",
          mustTry: "• A glass of cava on their hidden terrace after a fitting.\n• The bespoke tailoring service for a custom fit.",
          nycEquivalent: "Bergdorf Goodman",
          location: "Passeig de Gràcia, 93",
          vibe: "Old World Service",
          imageUrl: "https://barcelonapremium.com/images/181462_Santa_Eulalia_f.2.jpg"
        },
        {
          name: "El Born District",
          description: "Medieval streets lined with independent boutiques.",
          fullDescription: "Wander through the narrow, stone-paved streets of El Born to find leather artisans, local jewelry designers, and concept stores hidden in 14th-century buildings. It is the antithesis of the big mall.",
          nycConnectionText: "• The **SoHo** of Barcelona - historic architecture meeting retail.\n• Independent boutiques hidden in cobble-stoned streets.\n• A mix of local artisans, trendy cafes, and galleries.",
          mustTry: "• Getting lost in the alleyways near Santa Maria del Mar.\n• Finding a handmade leather bag from a local workshop.",
          nycEquivalent: "SoHo",
          location: "El Born",
          vibe: "Bohemian Chic"
        }
      ]
    },
    {
      id: "views",
      title: "Views",
      imageKeyword: "barcelona skyline rooftop",
      places: [
        {
          name: "Bunkers del Carmel",
          description: "Panoramic 360-degree views of the entire city.",
          fullDescription: "Old anti-aircraft bunkers from the Spanish Civil War that have become the city's best unauthorized viewpoint. It's raw, windy, and offers a view that stretches from the mountains to the sea.",
          nycConnectionText: "• A rougher, more local version of **Top of the Rock**.\n• The view is the star, not the amenities.\n• A popular spot for locals to watch the sunset.",
          mustTry: "• Bring your own wine and snacks for sunset.\n• Arriving early to get a good spot on the concrete.",
          nycEquivalent: "Top of the Rock",
          location: "Carrer de la Gran Vista",
          vibe: "Raw Beauty",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Bateries_antia%C3%A8ries_Tur%C3%B3_de_la_Rovira.jpg/800px-Bateries_antia%C3%A8ries_Tur%C3%B3_de_la_Rovira.jpg"
        },
        {
          name: "La Dolce Vitae at Majestic",
          description: "Iconic rooftop with views of Paseo de Gracia.",
          fullDescription: "A classic hotel rooftop that feels suspended over the city's most expensive street. The view of the Sagrada Familia from here is framed perfectly for Instagram.",
          nycConnectionText: "• Comparable to **The Roof at PUBLIC** - chic and scene-y.\n• All about seeing the skyline and being seen.\n• An elevated experience with high-end cocktails.",
          mustTry: "• The Majestic Nectari cocktail.\n• Visiting when the DJ starts the evening set.",
          nycEquivalent: "The Roof at PUBLIC",
          location: "Passeig de Gràcia, 68",
          vibe: "Elevated Chic",
          imageUrl: "https://unbuendiaenbarcelona.com/wp-content/uploads/2023/07/La-Dolce-Vitae-6.jpg"
        },
        {
          name: "W Barcelona (Eclipse)",
          description: "Sky-high glamour right on the ocean.",
          fullDescription: "Located in the sail-shaped hotel at the end of the boardwalk, Eclipse offers views of the entire coastline and the city grid. It feels separated from the city, floating above the Mediterranean.",
          nycConnectionText: "• Vibes of **The Standard, High Line** - glass and glamour.\n• Views that make you feel like you own the city.\n• A sleek, modern aesthetic right on the water.",
          mustTry: "• The Watermelon Martini.\n• Watching the ships leave the port from the window.",
          nycEquivalent: "The Standard",
          location: "Plaça de la Rosa dels Vents, 1",
          vibe: "Glass & Glamour",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/14-08-05-barcelona-RalfR-001.jpg/800px-14-08-05-barcelona-RalfR-001.jpg"
        },
        {
          name: "Tibidabo Amusement Park",
          description: "Retro charms on the highest peak.",
          fullDescription: "A vintage amusement park on top of Mount Tibidabo. The ferris wheel hangs over the edge of the mountain, offering perhaps the most terrifyingly beautiful view of Barcelona.",
          nycConnectionText: "• A mountain-top **Coney Island** - nostalgic and charming.\n• Vintage rides that feel like a step back in time.\n• Undeniably magical views mixed with kitsch.",
          mustTry: "• Riding the 'Avió' flight ride - a replica of the first flight.\n• Visiting the Sacred Heart church right next door.",
          nycEquivalent: "Coney Island",
          location: "Plaça del Tibidabo, 3-4",
          vibe: "Nostalgic Heights",
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Luna_park_Barcelona.jpg"
        }
      ]
    }
  ]
};

export const fetchCityGuide = async (latitude: number, longitude: number): Promise<CityData> => {
  // Return the static prototype data immediately (with small delay for effect)
  // This ensures the demo is stable and uses the curated "Barcelona" content.
  return new Promise(resolve => setTimeout(() => resolve(PLACEHOLDER_DATA), 800));
};