import {hungarianMessages, italianMessages, romanianMessages} from './additionalMessages';

export const messages = {
    en: {
        topBar: {
            tagline: 'Fine art photography by Andrei Pascu',
            preferencesLabel: 'Display',
            preferencesTitle: 'Display settings',
            preferencesDescription: 'Choose the site language and visual theme from one place.',
            languageLabel: 'Language',
            themeLabel: 'Theme',
            themeStudioTitle: 'Theme Studio',
            themeStudioDescription:
                'Choose a full visual mood for the site. Each preset changes palette, contrast, and typography together.',
            lightThemesLabel: 'Light themes',
            darkThemesLabel: 'Dark themes',
            completePresetLabel: 'Complete preset',
        },
        bottomBar: {
            eyebrow: 'Private inquiries',
            title: 'Built for calmer, more confident decisions around the work.',
            description:
                'My Lenses presents the collection with a stronger editorial rhythm, clearer print direction, and a more direct path into conversation.',
            artistBase: 'Based in Switzerland',
            artistShortBio:
                'Fine art and travel photography shaped for collectors, interiors, and slower image-led discovery.',
            nextStepLabel: 'Best next step',
            nextStepDescription:
                'Start with the print page if you want sizing, collector guidance, or a more complete inquiry flow.',
            supportCards: [
                'Archival canvas output, made to order, with presentation discussed directly.',
                'Switzerland-based artist, private inquiries, and calmer reply-led guidance.',
            ],
            primaryCta: 'Start print inquiry',
            secondaryCta: 'Browse curated picks',
            email: 'Email',
            whatsapp: 'WhatsApp',
            instagram: 'Instagram',
        },
        quickSidebar: {
            navigation: 'Navigation',
            onThisPage: 'On this page',
            inquiry: 'Inquiry',
            elsewhere: 'Elsewhere',
            navigate: 'Navigate',
            printInquiry: 'Print inquiry',
            contactFooter: 'Contact footer',
            inquire: 'Inquire',
            pageLabels: {
                home: 'Home',
                collection: 'Collection',
                prints: 'Prints',
                about: 'About',
                artwork: 'Artwork',
            },
            sections: {
                home: {
                    top: 'Hero',
                    collection: 'Selection',
                    prints: 'Prints',
                    story: 'Story',
                    contact: 'Contact',
                },
                collection: {
                    intro: 'Intro',
                    archive: 'Archive',
                    contact: 'Contact',
                },
                prints: {
                    intro: 'Intro',
                    process: 'Process',
                    highlights: 'Highlights',
                    inquiry: 'Inquiry',
                    contact: 'Contact',
                },
                about: {
                    intro: 'Story',
                    works: 'Works',
                    contact: 'Contact',
                },
                artwork: {
                    top: 'Artwork',
                    inquiry: 'Inquiry',
                    related: 'Related',
                    contact: 'Contact',
                },
            },
        },
        artworkTile: {
            collectorPrint: 'Collector print',
            viewArtwork: 'View artwork',
        },
        categories: {
            Travel: 'Travel',
            Nature: 'Nature',
            Street: 'Street',
            Wildlife: 'Wildlife',
            Canvas: 'Canvas',
            Instagram: 'Instagram',
            Portrait: 'Portrait',
            Architecture: 'Architecture',
        },
        filters: {
            All: 'All',
            'Collector starters': 'Collector starters',
            'Print-ready': 'Print-ready',
            Recent: 'Recent',
        },
        collectionViews: {
            'Best for large walls': {
                label: 'Best for large walls',
                description: 'Images with the strongest statement scale and architectural wall presence.',
            },
            'Collector starters': {
                label: 'Collector starters',
                description: 'The easiest first group to begin a print conversation around.',
            },
            'Quiet interiors': {
                label: 'Quiet interiors',
                description: 'Work selected for calm spaces, softer light, and slower atmosphere.',
            },
            'Black and white': {
                label: 'Black and white',
                description: 'Monochrome studies with strong tonal depth and cleaner presentation.',
            },
            Zurich: {
                label: 'Zurich',
                description: 'A city-led view for Swiss buyers and local collectors.',
            },
            Romania: {
                label: 'Romania',
                description: 'Images rooted in origin, memory, and Eastern European atmosphere.',
            },
            'Giftable prints': {
                label: 'Giftable prints',
                description: 'A softer shortlist for thoughtful gifts and smaller collector purchases.',
            },
            'New work': {
                label: 'New work',
                description: 'More recent additions and fresher image directions.',
            },
        },
        mainPage: {
            pageTitle: 'My Lenses | Fine art photography by Andrei Pascu',
            heroEyebrow: 'Limited collector selection',
            heroTitle: 'Photography shaped for slower, better choices.',
            heroDescription:
                "Start with a smaller edit of Andrei's strongest wall-ready works, then move into prints, placement, and a more private inquiry when a piece feels right.",
            heroPrimaryCta: 'Explore collector picks',
            heroSecondaryCta: 'View print guidance',
            stats: {
                collectionLabel: 'Collection',
                collectionDescription: 'Curated works across travel, stillness, street life, and atmosphere.',
                printReadyLabel: 'Print-ready',
                printReadyDescription: 'Wall-led pieces already framed for scale, mood, and collector fit.',
            },
            collectorSelection: {
                eyebrow: 'Collector selection',
                title: 'A smaller starting point into the work with the clearest wall presence.',
                description:
                    'Built to feel edited before it feels large, with stronger routes by room, location, and collector intent.',
                action: 'View full collection',
                routesLabel: 'Curated starting points',
                collectorFavoriteBadge: 'Collector favorite',
            },
            printExperience: {
                eyebrow: 'Print experience',
                title: 'The photographs now sell through room fit, scale, and atmosphere.',
                description:
                    'The print layer is framed for private inquiries: archival Giclee canvas, clearer size guidance, and a more thoughtful first conversation.',
                cards: [
                    {label: 'Material', value: 'Archival Giclee canvas'},
                    {label: 'Presentation', value: 'Framed or unframed guidance'},
                    {label: 'Process', value: 'Direct artist inquiry'},
                ],
                action: 'Enter the print page',
            },
            artistStory: {
                eyebrow: 'Artist',
                title:
                    'From Transylvania to Switzerland, Andrei photographs stillness, atmosphere, and lived memory.',
                description:
                    'The context is quieter now too: enough story to build trust and taste, without pulling attention away from the images.',
                role: 'Fine art and travel photography',
                action: 'Read the story',
            },
            printForward: {
                eyebrow: 'Print-forward works',
                title: 'A final pass through the pieces with the strongest commercial fit.',
                description:
                    'Selected for larger walls, quieter interiors, and more confident print conversations.',
                badge: 'Print-ready',
            },
            featuredBadge: 'Featured work',
            newerWorkBadge: 'Newer work',
        },
        collectionPage: {
            pageTitle: 'Collection | My Lenses',
            eyebrow: 'Collection',
            title: 'The full archive, with clearer entry points for walls, moods, and collector intent.',
            description:
                'Move by curated collection first, then by category if you want a wider browse. Every photograph now leads into a dedicated artwork page with print fit, presentation guidance, and direct inquiry.',
            action: 'Start with prints',
            featuredEntryBadge: 'Featured entry',
            curatedRoutesLabel: 'Curated routes',
            worksLabel: 'works',
            worksInView: 'works in this view',
            fallbackDescription:
                'Click any photograph to enter a dedicated artwork page with print fit, collector notes, and a guided inquiry path.',
        },
        aboutPage: {
            pageTitle: 'About | My Lenses',
            eyebrow: 'About Andrei Pascu',
            title:
                'A photographer drawn to stillness, atmosphere, and the emotional weight of ordinary moments.',
            paragraphs: [
                "Andrei's visual language began in the fog, folklore, and forests of Transylvania. That early sensitivity to atmosphere still runs through the work, whether the image was made in Switzerland, New York, Romania, or along quieter coastlines.",
                'After decades across professional sport, leadership, and life lived across places and rhythms, photography became the medium that held onto what would otherwise disappear too quickly: light on a wall, a gesture on a street, a landscape before it closes.',
                'The portfolio now presents that work in a more mature frame, not only as images to scroll, but as pieces meant to live inside rooms and accompany people over time.',
            ],
            chips: [
                'Switzerland based',
                'Fine art and travel photography',
                'Collector and interior inquiries',
            ],
            action: 'Enter the collection',
            selectedWorks: {
                eyebrow: 'Selected works',
                title: 'A small cross-section of the visual range behind the portfolio.',
                description:
                    'Street, travel, stillness, and the quieter emotional moments that translate beyond the screen.',
            },
        },
        printsPage: {
            pageTitle: 'Prints | My Lenses',
            eyebrow: 'Print consultation',
            heroTitle: 'Prints framed for collector conversations, not generic product browsing.',
            heroDescription:
                'Use a few details to shape a more thoughtful inquiry around artwork, scale, and atmosphere.',
            trustSignals: [
                {label: 'Material', value: 'Archival Giclee canvas'},
                {label: 'Production', value: 'Made to order in consultation'},
                {label: 'Guidance', value: 'Sizing and presentation support'},
                {label: 'Rhythm', value: 'Private reply without checkout friction'},
            ],
            primaryCta: 'Start with statement works',
            secondaryCta: 'Browse full collection',
            journey: [
                {
                    step: '1. Shortlist the work',
                    title: 'Begin with a calmer edit.',
                    description:
                        'Lead with the photographs that already feel right for walls, atmosphere, and presentation.',
                },
                {
                    step: '2. Match the room',
                    title: 'Talk in mood, scale, and light.',
                    description:
                        'The print discussion moves from generic sizes into how the work should actually live inside a space.',
                },
                {
                    step: '3. Inquire directly',
                    title: 'Move into a private conversation.',
                    description:
                        'No marketplace theater. Just a better first message with enough context to produce a stronger reply.',
                },
            ],
            highlights: {
                eyebrow: 'Print-forward works',
                title: 'A stronger starting point for prints, gifts, and interior-led selections.',
                description:
                    'These are already framed to support the print flow with scale, atmosphere, and easier first decisions.',
                badge: 'Print-ready',
            },
            guidedTitle: 'Build a stronger first inquiry for prints, interiors, or gifts.',
            guidedDescription:
                'Share the room, the artwork, or the kind of guidance you want so the first reply can be more specific and useful.',
        },
        guidedInquiry: {
            defaultEyebrow: 'Guided inquiry',
            defaultTitle: 'Shape a more complete print conversation before the first reply.',
            defaultDescription:
                'Share the artwork, the room, and the level of guidance you want so the conversation can begin with more clarity.',
            assuranceTitle: 'What to expect next',
            assurancePoints: [
                'A more focused recommendation based on mood, room type, and wall presence.',
                'A clear discussion around likely size, print suitability, and next steps.',
                'A direct artist conversation without marketplace friction or generic upsell.',
            ],
            chooseIntentTitle: 'Choose the intent',
            chooseIntentDescription: 'Start with the kind of conversation you want to have.',
            addContextTitle: 'Add room and artwork context',
            addContextDescription: 'Only the details that help the first reply feel more tailored.',
            artworkLabel: 'Artwork',
            cityLabel: 'City or country',
            tempoLabel: 'Conversation tempo',
            notesLabel: 'Notes',
            summaryLabel: 'Inquiry summary',
            intentLabel: 'Intent',
            settingLabel: 'Setting',
            locationLabel: 'Location',
            artworkPlaceholder: 'Still deciding',
            cityPlaceholder: 'Zurich, Switzerland',
            notesPlaceholder:
                'Describe the mood, wall scale, or what you want the piece to do in the space.',
            openAction: 'Open private inquiry',
            emailDirectlyAction: 'Email directly',
            directEmailSubject: 'Private Inquiry',
            curatedRecommendation: 'Curated recommendation',
            inquiryOptions: {
                printConsultation: {
                    label: 'Print consultation',
                    description: 'Help choosing the right work, size, and mood for a space.',
                },
                artworkAvailability: {
                    label: 'Artwork availability',
                    description: 'Ask specifically about one photograph and how it can be produced.',
                },
                curatedSelection: {
                    label: 'Curated selection',
                    description: 'Receive a smaller recommendation based on atmosphere and room fit.',
                },
                giftGuidance: {
                    label: 'Gift guidance',
                    description: 'Start with a calmer shortlist for a meaningful present.',
                },
                commissionRequest: {
                    label: 'Commission request',
                    description: 'Discuss a more custom direction or project-led brief.',
                },
            },
            roomOptions: {
                livingRoom: 'Living room',
                bedroom: 'Bedroom',
                office: 'Office',
                hospitality: 'Hospitality space',
                gift: 'Gift',
                stillDeciding: 'Still deciding',
            },
            budget: {
                customProject: 'Custom project budget',
                giftGuidance: 'Gift-led guidance',
                openToGuidance: 'Open to guidance',
            },
            timeline: {
                gift: 'For a gift or special date',
                nextMonth: 'Within the next month',
                exploring: 'Just exploring',
            },
        },
        artworkPage: {
            availabilityFallback: 'Available by inquiry',
            selectedSizesAvailable: 'Selected sizes available',
            editionFallback: 'Open edition by inquiry',
            priceFallback: 'On request by size',
            startingAround: 'Starting around',
            capturedPrefix: 'Captured',
            labels: {
                suggestedSize: 'Suggested size',
                collectorFit: 'Collector fit',
                presentation: 'Presentation',
                availability: 'Availability',
                edition: 'Edition',
                bestFormat: 'Best format',
                priceGuidance: 'Price guidance',
                privateInquiryNotes: 'Private inquiry notes',
            },
            ctas: {
                askAbout: 'Ask about this work',
                printGuidance: 'View print guidance',
                originalPost: 'Original post',
                instagram: 'Instagram',
            },
            privateInquiryNotes: [
                'Made to order with room, scale, and presentation discussed directly.',
                'Archival canvas output designed to keep tonal depth and atmosphere intact.',
                'Framed or unframed guidance can be tailored to the wall and surrounding materials.',
            ],
            inquiry: {
                eyebrow: 'Artwork inquiry',
                titlePrefix: 'Start the conversation around',
                description:
                    'If this photograph speaks to you, use the guided inquiry to make the first reply more specific around room, scale, and collector intent.',
            },
            related: {
                eyebrow: 'Related works',
                title: 'Other photographs likely to resonate with the same collector intent.',
                description: 'Related by subject, place, atmosphere, or print character.',
            },
        },
        artworkDetails: {
            presentation: {
                portrait: {
                    title: 'Slim float frame or clean canvas wrap',
                    note:
                        'Portrait-led works usually benefit from a little more breathing room and a restrained frame profile.',
                },
                architecture: {
                    title: 'Black or natural oak float frame',
                    note:
                        'Architectural images feel strongest with sharper edges and a cleaner presentation language.',
                },
                nature: {
                    title: 'Warm oak float frame or gallery wrap',
                    note:
                        'Nature work often opens beautifully when the presentation stays warm, simple, and unobtrusive.',
                },
                fallback: {
                    title: 'Framed or unframed by room fit',
                    note:
                        'The right presentation depends on wall scale, surrounding materials, and how calm or graphic the room already is.',
                },
            },
            customConsultation: 'Custom consultation',
            sizeNotes: [
                'A versatile starting point for most homes and studies.',
                'Best when the work needs more wall presence or distance.',
                'Use the room and wall dimensions to tailor the final format.',
            ],
            priceFromFallback: 'From 140 CHF',
            priceOnRequest: 'Price on request',
        },
        printRecommendations: {
            default: {
                recommendedSize: '50 x 30 cm or custom',
                bestFit: 'Fine art Giclee canvas',
                idealSetting: 'Quiet interiors, creative studios, and collected living spaces',
                collectorNote:
                    'A versatile piece designed to hold atmosphere, detail, and emotional presence on the wall.',
            },
            byCategory: {
                Nature: {
                    recommendedSize: '90 x 60 cm statement canvas',
                    bestFit: 'Large-format Giclee canvas',
                    idealSetting: 'Living rooms, lounges, and calm hospitality spaces',
                    collectorNote:
                        'Landscape work opens up beautifully at larger scale, where texture, light, and distance can breathe.',
                },
                Travel: {
                    recommendedSize: '90 x 60 cm statement canvas',
                    bestFit: 'Gallery-scale canvas or custom format',
                    idealSetting: 'Open-plan homes, offices, and feature walls',
                    collectorNote:
                        'Travel images carry a strong sense of place and become immersive when printed with generous presence.',
                },
                Street: {
                    recommendedSize: '50 x 30 cm editorial canvas',
                    bestFit: 'Medium-format Giclee canvas',
                    idealSetting: 'Hallways, studies, and modern urban interiors',
                    collectorNote:
                        'Street photographs feel especially compelling as intimate, conversation-starting pieces.',
                },
                Wildlife: {
                    recommendedSize: '50 x 30 cm collector canvas',
                    bestFit: 'Museum-grade canvas with rich tonal depth',
                    idealSetting: 'Reading corners, offices, and personal collections',
                    collectorNote:
                        'Wildlife work rewards close viewing, where gesture, stillness, and fine detail take over.',
                },
                Portrait: {
                    recommendedSize: '50 x 30 cm portrait-led canvas',
                    bestFit: 'Medium-format fine art canvas',
                    idealSetting: 'Studios, dressing spaces, and intimate interiors',
                    collectorNote:
                        'Portrait pieces hold attention best when printed with enough scale to preserve expression and texture.',
                },
                Architecture: {
                    recommendedSize: '90 x 60 cm architectural canvas',
                    bestFit: 'Large-format Giclee canvas',
                    idealSetting: 'Minimal interiors, offices, and design-led spaces',
                    collectorNote:
                        'Architectural compositions gain strength on the wall through scale, structure, and clean presentation.',
                },
                Canvas: {
                    recommendedSize: 'Custom consultation',
                    bestFit: 'Giclee canvas preview',
                    idealSetting: 'Sized to the room and viewing distance',
                    collectorNote:
                        'Each canvas can be discussed individually to match format, scale, and placement.',
                },
            },
            skylineOrBridge: {
                recommendedSize: '90 x 60 cm panoramic canvas',
                idealSetting: 'Living rooms, offices, and entry statements',
            },
            switzerlandNote:
                'This piece carries a calm alpine clarity that works beautifully in refined, light-filled interiors.',
        },
        inquiryEmail: {
            labels: {
                inquiryType: 'Inquiry type',
                artwork: 'Artwork',
                roomOrSetting: 'Room or setting',
                budgetComfort: 'Budget comfort',
                timeline: 'Timeline',
                location: 'Location',
                notes: 'Notes',
            },
            fallbacks: {
                stillDeciding: 'Still deciding',
                openToGuidance: 'Open to guidance',
                justExploring: 'Just exploring',
            },
            greeting: 'Hello Andrei,',
            intro: 'I would like to discuss a possible photographic piece for my space.',
        },
    },
    de: {
        topBar: {
            tagline: 'Fine-Art-Fotografie von Andrei Pascu',
            preferencesLabel: 'Anzeige',
            preferencesTitle: 'Anzeigeeinstellungen',
            preferencesDescription: 'Waehlen Sie Sprache und visuelles Theme der Seite an einem Ort.',
            languageLabel: 'Sprache',
            themeLabel: 'Thema',
            themeStudioTitle: 'Theme Studio',
            themeStudioDescription:
                'Waehlen Sie eine vollstaendige visuelle Stimmung fuer die Seite. Jedes Preset veraendert Palette, Kontrast und Typografie gemeinsam.',
            lightThemesLabel: 'Helle Themes',
            darkThemesLabel: 'Dunkle Themes',
            completePresetLabel: 'Vollstaendiges Preset',
        },
        bottomBar: {
            eyebrow: 'Private Anfragen',
            title: 'Entwickelt für ruhigere und sicherere Entscheidungen rund um die Arbeiten.',
            description:
                'My Lenses präsentiert die Kollektion mit einem stärkeren editoriellen Rhythmus, klarerer Druckausrichtung und einem direkteren Einstieg ins Gespräch.',
            artistBase: 'Mit Sitz in der Schweiz',
            artistShortBio:
                'Fine-Art- und Reisefotografie für Sammler, Interiors und eine langsamere, bildgeführte Entdeckung.',
            nextStepLabel: 'Bester nächster Schritt',
            nextStepDescription:
                'Beginnen Sie mit der Druckseite, wenn Sie Größen, Sammlerhinweise oder einen vollständigeren Anfrageablauf wünschen.',
            supportCards: [
                'Archivaler Leinwanddruck nach Bestellung, mit direkt besprochener Präsentation.',
                'Schweizer Künstler, private Anfragen und ruhigere, antwortungsorientierte Beratung.',
            ],
            primaryCta: 'Druckanfrage starten',
            secondaryCta: 'Kuratierten Einstieg ansehen',
            email: 'E-Mail',
            whatsapp: 'WhatsApp',
            instagram: 'Instagram',
        },
        quickSidebar: {
            navigation: 'Navigation',
            onThisPage: 'Auf dieser Seite',
            inquiry: 'Anfrage',
            elsewhere: 'Anderswo',
            navigate: 'Navigation',
            printInquiry: 'Druckanfrage',
            contactFooter: 'Kontakt-Footer',
            inquire: 'Anfragen',
            pageLabels: {
                home: 'Start',
                collection: 'Kollektion',
                prints: 'Drucke',
                about: 'Über',
                artwork: 'Werk',
            },
            sections: {
                home: {
                    top: 'Hero',
                    collection: 'Auswahl',
                    prints: 'Drucke',
                    story: 'Geschichte',
                    contact: 'Kontakt',
                },
                collection: {
                    intro: 'Intro',
                    archive: 'Archiv',
                    contact: 'Kontakt',
                },
                prints: {
                    intro: 'Intro',
                    process: 'Ablauf',
                    highlights: 'Highlights',
                    inquiry: 'Anfrage',
                    contact: 'Kontakt',
                },
                about: {
                    intro: 'Geschichte',
                    works: 'Werke',
                    contact: 'Kontakt',
                },
                artwork: {
                    top: 'Werk',
                    inquiry: 'Anfrage',
                    related: 'Verwandt',
                    contact: 'Kontakt',
                },
            },
        },
        artworkTile: {
            collectorPrint: 'Sammlerdruck',
            viewArtwork: 'Werk ansehen',
        },
        categories: {
            Travel: 'Reise',
            Nature: 'Natur',
            Street: 'Street',
            Wildlife: 'Wildlife',
            Canvas: 'Leinwand',
            Instagram: 'Instagram',
            Portrait: 'Porträt',
            Architecture: 'Architektur',
        },
        filters: {
            All: 'Alle',
            'Collector starters': 'Einstieg für Sammler',
            'Print-ready': 'Druckbereit',
            Recent: 'Neu',
        },
        collectionViews: {
            'Best for large walls': {
                label: 'Für große Wände',
                description: 'Arbeiten mit der stärksten Präsenz für Maßstab, Statement und architektonische Wände.',
            },
            'Collector starters': {
                label: 'Einstieg für Sammler',
                description: 'Die einfachste erste Auswahl, um ein Druckgespräch zu beginnen.',
            },
            'Quiet interiors': {
                label: 'Ruhige Interiors',
                description: 'Arbeiten für ruhige Räume, weicheres Licht und langsamere Atmosphäre.',
            },
            'Black and white': {
                label: 'Schwarzweiß',
                description: 'Monochrome Studien mit starker Tonalität und klarerer Präsentation.',
            },
            Zurich: {
                label: 'Zürich',
                description: 'Eine stadtbezogene Ansicht für Schweizer Käufer und lokale Sammler.',
            },
            Romania: {
                label: 'Rumänien',
                description: 'Bilder, die in Herkunft, Erinnerung und osteuropäischer Atmosphäre verwurzelt sind.',
            },
            'Giftable prints': {
                label: 'Als Geschenk geeignet',
                description: 'Eine sanftere Auswahl für bedeutungsvolle Geschenke und kleinere Käufe.',
            },
            'New work': {
                label: 'Neue Arbeiten',
                description: 'Neuere Ergänzungen und frischere Bildrichtungen.',
            },
        },
        mainPage: {
            pageTitle: 'My Lenses | Fine-Art-Fotografie von Andrei Pascu',
            heroEyebrow: 'Limitierte Sammlerauswahl',
            heroTitle: 'Fotografie für langsamere und bessere Entscheidungen.',
            heroDescription:
                'Beginnen Sie mit einer kleineren Auswahl von Andreis stärksten wandfähigen Arbeiten und gehen Sie dann weiter zu Drucken, Platzierung und einer privateren Anfrage, wenn ein Bild passt.',
            heroPrimaryCta: 'Sammlerauswahl entdecken',
            heroSecondaryCta: 'Druckhinweise ansehen',
            stats: {
                collectionLabel: 'Kollektion',
                collectionDescription: 'Kuratierten Arbeiten aus Reise, Ruhe, Street Life und Atmosphäre.',
                printReadyLabel: 'Druckbereit',
                printReadyDescription: 'Arbeiten für die Wand, bereits auf Maßstab, Stimmung und Sammlerfit ausgerichtet.',
            },
            collectorSelection: {
                eyebrow: 'Sammlerauswahl',
                title: 'Ein kleinerer Einstieg in die Arbeiten mit der klarsten Wandwirkung.',
                description:
                    'So aufgebaut, dass es zuerst kuratiert und nicht groß wirkt, mit stärkeren Routen nach Raum, Ort und Sammlerabsicht.',
                action: 'Gesamte Kollektion ansehen',
                routesLabel: 'Kuratierten Einstiege',
                collectorFavoriteBadge: 'Sammlerfavorit',
            },
            printExperience: {
                eyebrow: 'Druckerlebnis',
                title: 'Die Fotografien verkaufen sich nun über Raumfit, Maßstab und Atmosphäre.',
                description:
                    'Die Druckebene ist auf private Anfragen ausgerichtet: archivale Giclée-Leinwand, klarere Größenhinweise und ein durchdachteres erstes Gespräch.',
                cards: [
                    {label: 'Material', value: 'Archivale Giclée-Leinwand'},
                    {label: 'Präsentation', value: 'Hinweise zu gerahmt oder ungerahmt'},
                    {label: 'Ablauf', value: 'Direkte Künstleranfrage'},
                ],
                action: 'Zur Druckseite',
            },
            artistStory: {
                eyebrow: 'Künstler',
                title:
                    'Von Transsilvanien bis in die Schweiz fotografiert Andrei Stille, Atmosphäre und gelebte Erinnerung.',
                description:
                    'Auch der Kontext ist nun ruhiger: genug Geschichte, um Vertrauen und Geschmack aufzubauen, ohne den Bildern Aufmerksamkeit zu nehmen.',
                role: 'Fine-Art- und Reisefotografie',
                action: 'Geschichte lesen',
            },
            printForward: {
                eyebrow: 'Druckstarke Werke',
                title: 'Ein letzter Blick auf die Arbeiten mit der stärksten kommerziellen Eignung.',
                description:
                    'Ausgewählt für größere Wände, ruhigere Interiors und sicherere Druckgespräche.',
                badge: 'Druckbereit',
            },
            featuredBadge: 'Ausgewähltes Werk',
            newerWorkBadge: 'Neuere Arbeit',
        },
        collectionPage: {
            pageTitle: 'Kollektion | My Lenses',
            eyebrow: 'Kollektion',
            title: 'Das gesamte Archiv, mit klareren Einstiegen nach Wänden, Stimmungen und Sammlerabsicht.',
            description:
                'Bewegen Sie sich zuerst über kuratierte Ansichten und dann über Kategorien, wenn Sie breiter stöbern möchten. Jedes Foto führt jetzt zu einer eigenen Werkseite mit Druckfit, Präsentationshinweisen und direktem Anfrageweg.',
            action: 'Mit Drucken beginnen',
            featuredEntryBadge: 'Ausgewählter Einstieg',
            curatedRoutesLabel: 'Kuratierten Routen',
            worksLabel: 'Werke',
            worksInView: 'Werke in dieser Ansicht',
            fallbackDescription:
                'Klicken Sie auf ein Foto, um zu einer eigenen Werkseite mit Druckfit, Sammlernotizen und geführter Anfrage zu gelangen.',
        },
        aboutPage: {
            pageTitle: 'Über | My Lenses',
            eyebrow: 'Über Andrei Pascu',
            title:
                'Ein Fotograf, angezogen von Stille, Atmosphäre und dem emotionalen Gewicht gewöhnlicher Momente.',
            paragraphs: [
                'Andreis Bildsprache begann in Nebel, Folklore und Wäldern Transsilvaniens. Diese frühe Sensibilität für Atmosphäre durchzieht die Arbeiten bis heute, egal ob das Bild in der Schweiz, in New York, in Rumänien oder an ruhigeren Küsten entstanden ist.',
                'Nach Jahrzehnten in Profisport, Führung und einem Leben über viele Orte und Rhythmen hinweg wurde die Fotografie zum Medium, das festhält, was sonst zu schnell verschwinden würde: Licht an einer Wand, eine Geste auf der Straße, eine Landschaft, bevor sie sich schließt.',
                'Das Portfolio präsentiert diese Arbeiten nun in einem reiferen Rahmen, nicht nur als Bilder zum Scrollen, sondern als Stücke, die in Räumen leben und Menschen über lange Zeit begleiten sollen.',
            ],
            chips: [
                'Mit Sitz in der Schweiz',
                'Fine-Art- und Reisefotografie',
                'Anfragen von Sammlern und Interiors',
            ],
            action: 'Zur Kollektion',
            selectedWorks: {
                eyebrow: 'Ausgewählte Werke',
                title: 'Ein kleiner Querschnitt durch die visuelle Bandbreite hinter dem Portfolio.',
                description:
                    'Street, Reise, Stille und die leiseren emotionalen Momente, die über den Bildschirm hinaus wirken.',
            },
        },
        printsPage: {
            pageTitle: 'Drucke | My Lenses',
            eyebrow: 'Druckberatung',
            heroTitle: 'Drucke für Sammlergespräche, nicht für generisches Produkt-Browsing.',
            heroDescription:
                'Mit wenigen Angaben formen Sie eine durchdachtere Anfrage rund um Werk, Größe und Atmosphäre.',
            trustSignals: [
                {label: 'Material', value: 'Archivale Giclée-Leinwand'},
                {label: 'Produktion', value: 'Auf Bestellung und im Gespräch gefertigt'},
                {label: 'Beratung', value: 'Unterstützung bei Größe und Präsentation'},
                {label: 'Rhythmus', value: 'Private Antwort ohne Checkout-Reibung'},
            ],
            primaryCta: 'Mit Statement-Arbeiten beginnen',
            secondaryCta: 'Gesamte Kollektion ansehen',
            journey: [
                {
                    step: '1. Werke eingrenzen',
                    title: 'Mit einer ruhigeren Auswahl beginnen.',
                    description:
                        'Starten Sie mit Fotografien, die sich bereits für Wand, Atmosphäre und Präsentation richtig anfühlen.',
                },
                {
                    step: '2. Raum abstimmen',
                    title: 'In Stimmung, Maßstab und Licht denken.',
                    description:
                        'Das Druckgespräch bewegt sich von generischen Größen hin dazu, wie die Arbeit tatsächlich im Raum leben soll.',
                },
                {
                    step: '3. Direkt anfragen',
                    title: 'In ein privates Gespräch wechseln.',
                    description:
                        'Kein Marktplatz-Theater. Nur eine bessere erste Nachricht mit genug Kontext für eine stärkere Antwort.',
                },
            ],
            highlights: {
                eyebrow: 'Druckstarke Werke',
                title: 'Ein stärkerer Einstieg für Drucke, Geschenke und interior-geführte Auswahlen.',
                description:
                    'Diese Arbeiten sind bereits so gesetzt, dass sie den Druckprozess mit Maßstab, Atmosphäre und leichteren ersten Entscheidungen unterstützen.',
                badge: 'Druckbereit',
            },
            guidedTitle: 'Eine stärkere erste Anfrage für Drucke, Interiors oder Geschenke aufbauen.',
            guidedDescription:
                'Teilen Sie den Raum, das Werk oder die Art der gewünschten Begleitung, damit die erste Antwort konkreter und hilfreicher ausfallen kann.',
        },
        guidedInquiry: {
            defaultEyebrow: 'Geführte Anfrage',
            defaultTitle: 'Das Druckgespräch schon vor der ersten Antwort vollständiger formen.',
            defaultDescription:
                'Teilen Sie Werk, Raum und gewünschtes Maß an Beratung, damit das Gespräch mit mehr Klarheit beginnen kann.',
            assuranceTitle: 'Was Sie als Nächstes erwarten können',
            assurancePoints: [
                'Eine fokussiertere Empfehlung nach Stimmung, Raumtyp und Wandwirkung.',
                'Ein klares Gespräch über wahrscheinliche Größe, Druckeignung und nächste Schritte.',
                'Ein direktes Künstlergespräch ohne Marktplatz-Reibung oder generisches Upselling.',
            ],
            chooseIntentTitle: 'Absicht wählen',
            chooseIntentDescription: 'Beginnen Sie mit der Art von Gespräch, die Sie führen möchten.',
            addContextTitle: 'Raum- und Werkkontext ergänzen',
            addContextDescription: 'Nur die Details, die die erste Antwort individueller machen.',
            artworkLabel: 'Werk',
            cityLabel: 'Stadt oder Land',
            tempoLabel: 'Gesprächstempo',
            notesLabel: 'Notizen',
            summaryLabel: 'Anfrageübersicht',
            intentLabel: 'Absicht',
            settingLabel: 'Raum',
            locationLabel: 'Ort',
            artworkPlaceholder: 'Noch unentschieden',
            cityPlaceholder: 'Zürich, Schweiz',
            notesPlaceholder:
                'Beschreiben Sie die Stimmung, das Wandmaß oder was das Werk im Raum leisten soll.',
            openAction: 'Private Anfrage öffnen',
            emailDirectlyAction: 'Direkt mailen',
            directEmailSubject: 'Private Anfrage',
            curatedRecommendation: 'Kuratierten Empfehlung',
            inquiryOptions: {
                printConsultation: {
                    label: 'Druckberatung',
                    description: 'Hilfe bei der Wahl des richtigen Werks, Formats und der Stimmung für einen Raum.',
                },
                artworkAvailability: {
                    label: 'Verfügbarkeit des Werks',
                    description: 'Fragen Sie gezielt nach einem bestimmten Foto und wie es produziert werden kann.',
                },
                curatedSelection: {
                    label: 'Kuratierten Auswahl',
                    description: 'Erhalten Sie eine kleinere Empfehlung nach Atmosphäre und Raumfit.',
                },
                giftGuidance: {
                    label: 'Geschenkberatung',
                    description: 'Starten Sie mit einer ruhigeren Auswahl für ein bedeutungsvolles Geschenk.',
                },
                commissionRequest: {
                    label: 'Auftragsanfrage',
                    description: 'Besprechen Sie eine individuellere Richtung oder ein projektbezogenes Briefing.',
                },
            },
            roomOptions: {
                livingRoom: 'Wohnzimmer',
                bedroom: 'Schlafzimmer',
                office: 'Büro',
                hospitality: 'Gastbereich',
                gift: 'Geschenk',
                stillDeciding: 'Noch unentschieden',
            },
            budget: {
                customProject: 'Budget für individuelles Projekt',
                giftGuidance: 'Geschenkorientierte Beratung',
                openToGuidance: 'Offen für Beratung',
            },
            timeline: {
                gift: 'Für ein Geschenk oder ein besonderes Datum',
                nextMonth: 'Innerhalb des nächsten Monats',
                exploring: 'Ich schaue mich erst um',
            },
        },
        artworkPage: {
            availabilityFallback: 'Auf Anfrage verfügbar',
            selectedSizesAvailable: 'Ausgewählte Größen verfügbar',
            editionFallback: 'Offene Edition auf Anfrage',
            priceFallback: 'Preis auf Anfrage nach Größe',
            startingAround: 'Beginnend bei',
            capturedPrefix: 'Aufgenommen',
            labels: {
                suggestedSize: 'Empfohlene Größe',
                collectorFit: 'Sammlerfit',
                presentation: 'Präsentation',
                availability: 'Verfügbarkeit',
                edition: 'Edition',
                bestFormat: 'Bestes Format',
                priceGuidance: 'Preisrahmen',
                privateInquiryNotes: 'Hinweise zur privaten Anfrage',
            },
            ctas: {
                askAbout: 'Zu dieser Arbeit anfragen',
                printGuidance: 'Druckhinweise ansehen',
                originalPost: 'Originalbeitrag',
                instagram: 'Instagram',
            },
            privateInquiryNotes: [
                'Auf Bestellung gefertigt, mit direkter Besprechung von Raum, Maßstab und Präsentation.',
                'Archivale Leinwandausgabe, die Tonalität und Atmosphäre bewahrt.',
                'Hinweise zu gerahmt oder ungerahmt können auf Wand und Materialien abgestimmt werden.',
            ],
            inquiry: {
                eyebrow: 'Werkanfrage',
                titlePrefix: 'Das Gespräch beginnen über',
                description:
                    'Wenn dieses Foto Sie anspricht, nutzen Sie die geführte Anfrage, um die erste Antwort konkreter auf Raum, Maßstab und Sammlerabsicht auszurichten.',
            },
            related: {
                eyebrow: 'Verwandte Werke',
                title: 'Weitere Fotografien, die zur gleichen Sammlerabsicht passen könnten.',
                description: 'Verwandt nach Motiv, Ort, Atmosphäre oder Druckcharakter.',
            },
        },
        artworkDetails: {
            presentation: {
                portrait: {
                    title: 'Schmaler Schattenfugenrahmen oder klarer Leinwandrand',
                    note:
                        'Porträtorientierte Arbeiten profitieren meist von etwas mehr Luft und einem zurückhaltenden Rahmenprofil.',
                },
                architecture: {
                    title: 'Schwarzer oder naturfarbener Eichen-Schattenfugenrahmen',
                    note:
                        'Architekturfotografien wirken mit schärferen Kanten und einer klareren Präsentationssprache am stärksten.',
                },
                nature: {
                    title: 'Warmer Eichenrahmen oder Galerieumschlag',
                    note:
                        'Naturarbeiten öffnen sich besonders schön, wenn die Präsentation warm, einfach und unaufdringlich bleibt.',
                },
                fallback: {
                    title: 'Gerahmt oder ungerahmt je nach Raum',
                    note:
                        'Die richtige Präsentation hängt von Wandmaßstab, umgebenden Materialien und der Frage ab, wie ruhig oder grafisch der Raum bereits ist.',
                },
            },
            customConsultation: 'Individuelle Beratung',
            sizeNotes: [
                'Ein vielseitiger Ausgangspunkt für die meisten Wohnräume und Arbeitszimmer.',
                'Ideal, wenn die Arbeit mehr Wandpräsenz oder Betrachtungsabstand braucht.',
                'Nutzen Sie Raum- und Wandmaße, um das endgültige Format abzustimmen.',
            ],
            priceFromFallback: 'Ab 140 CHF',
            priceOnRequest: 'Preis auf Anfrage',
        },
        printRecommendations: {
            default: {
                recommendedSize: '50 x 30 cm oder individuell',
                bestFit: 'Fine-Art-Giclée-Leinwand',
                idealSetting: 'Ruhige Interiors, kreative Studios und sorgfältig gestaltete Wohnräume',
                collectorNote:
                    'Ein vielseitiges Werk, das Atmosphäre, Detail und emotionale Präsenz an der Wand hält.',
            },
            byCategory: {
                Nature: {
                    recommendedSize: '90 x 60 cm Statement-Leinwand',
                    bestFit: 'Großformatige Giclée-Leinwand',
                    idealSetting: 'Wohnzimmer, Lounges und ruhige Hospitality-Räume',
                    collectorNote:
                        'Landschaftsarbeiten öffnen sich in größerem Maßstab besonders schön, wo Textur, Licht und Distanz atmen können.',
                },
                Travel: {
                    recommendedSize: '90 x 60 cm Statement-Leinwand',
                    bestFit: 'Galerieformat-Leinwand oder individuelles Format',
                    idealSetting: 'Offene Wohnräume, Büros und Akzentwände',
                    collectorNote:
                        'Reisefotografien tragen einen starken Ortssinn und wirken mit großzügiger Präsenz besonders immersiv.',
                },
                Street: {
                    recommendedSize: '50 x 30 cm editoriale Leinwand',
                    bestFit: 'Mittelformatige Giclée-Leinwand',
                    idealSetting: 'Flure, Arbeitszimmer und moderne urbane Interiors',
                    collectorNote:
                        'Street-Fotografien wirken besonders stark als intime, gesprächsanstoßende Arbeiten.',
                },
                Wildlife: {
                    recommendedSize: '50 x 30 cm Sammlerleinwand',
                    bestFit: 'Museumswürdige Leinwand mit reicher Tonalität',
                    idealSetting: 'Leseecken, Büros und persönliche Sammlungen',
                    collectorNote:
                        'Wildlife-Arbeiten belohnen genaues Hinschauen, bei dem Geste, Stille und feine Details den Raum übernehmen.',
                },
                Portrait: {
                    recommendedSize: '50 x 30 cm porträtorientierte Leinwand',
                    bestFit: 'Mittelformatige Fine-Art-Leinwand',
                    idealSetting: 'Studios, Ankleidezimmer und intime Interiors',
                    collectorNote:
                        'Porträtarbeiten halten Aufmerksamkeit am besten, wenn genug Maßstab Ausdruck und Textur trägt.',
                },
                Architecture: {
                    recommendedSize: '90 x 60 cm architektonische Leinwand',
                    bestFit: 'Großformatige Giclée-Leinwand',
                    idealSetting: 'Minimalistische Interiors, Büros und designorientierte Räume',
                    collectorNote:
                        'Architektonische Kompositionen gewinnen an Stärke durch Maßstab, Struktur und klare Präsentation.',
                },
                Canvas: {
                    recommendedSize: 'Individuelle Beratung',
                    bestFit: 'Giclée-Leinwandvorschau',
                    idealSetting: 'Auf Raum und Betrachtungsabstand abgestimmt',
                    collectorNote:
                        'Jede Leinwand kann individuell besprochen werden, damit Format, Maßstab und Platzierung passen.',
                },
            },
            skylineOrBridge: {
                recommendedSize: '90 x 60 cm Panorama-Leinwand',
                idealSetting: 'Wohnzimmer, Büros und prägnante Eingangsbereiche',
            },
            switzerlandNote:
                'Dieses Werk trägt eine ruhige alpine Klarheit, die in verfeinerten, lichtdurchfluteten Interiors besonders gut funktioniert.',
        },
        inquiryEmail: {
            labels: {
                inquiryType: 'Art der Anfrage',
                artwork: 'Werk',
                roomOrSetting: 'Raum oder Setting',
                budgetComfort: 'Budgetrahmen',
                timeline: 'Zeitplan',
                location: 'Ort',
                notes: 'Notizen',
            },
            fallbacks: {
                stillDeciding: 'Noch unentschieden',
                openToGuidance: 'Offen für Beratung',
                justExploring: 'Ich schaue mich erst um',
            },
            greeting: 'Hallo Andrei,',
            intro: 'Ich möchte ein mögliches fotografisches Werk für meinen Raum besprechen.',
        },
    },
    fr: {
        topBar: {
            tagline: "Photographie d'art par Andrei Pascu",
            preferencesLabel: 'Affichage',
            preferencesTitle: "Parametres d'affichage",
            preferencesDescription: "Choisissez la langue du site et le theme visuel au meme endroit.",
            languageLabel: 'Langue',
            themeLabel: 'Theme',
            themeStudioTitle: 'Studio theme',
            themeStudioDescription:
                "Choisissez une ambiance visuelle complete pour le site. Chaque preset modifie ensemble la palette, le contraste et la typographie.",
            lightThemesLabel: 'Themes clairs',
            darkThemesLabel: 'Themes sombres',
            completePresetLabel: 'Preset complet',
        },
        bottomBar: {
            eyebrow: 'Demandes privees',
            title: "Concu pour des decisions plus calmes et plus sures autour des oeuvres.",
            description:
                "My Lenses presente la collection avec un rythme editorial plus affirme, une direction d'impression plus claire et un chemin plus direct vers la conversation.",
            artistBase: 'Base en Suisse',
            artistShortBio:
                "Photographie d'art et de voyage pensee pour les collectionneurs, les interieurs et une decouverte plus lente guidee par l'image.",
            nextStepLabel: 'Meilleure etape suivante',
            nextStepDescription:
                "Commencez par la page des impressions si vous souhaitez des conseils de format, des reperes pour collectionneur ou un parcours de demande plus complet.",
            supportCards: [
                "Tirage sur toile archival, realise a la commande, avec une presentation discutee directement.",
                'Artiste base en Suisse, demandes privees et conseils plus calmes, guides par la reponse.',
            ],
            primaryCta: "Commencer une demande d'impression",
            secondaryCta: 'Voir la selection guidee',
            email: 'Courriel',
            whatsapp: 'WhatsApp',
            instagram: 'Instagram',
        },
        quickSidebar: {
            navigation: 'Navigation',
            onThisPage: 'Sur cette page',
            inquiry: 'Demande',
            elsewhere: 'Ailleurs',
            navigate: 'Navigation',
            printInquiry: "Demande d'impression",
            contactFooter: 'Pied de page contact',
            inquire: 'Demander',
            pageLabels: {
                home: 'Accueil',
                collection: 'Collection',
                prints: 'Impressions',
                about: 'A propos',
                artwork: 'Oeuvre',
            },
            sections: {
                home: {
                    top: 'Hero',
                    collection: 'Selection',
                    prints: 'Impressions',
                    story: 'Recit',
                    contact: 'Contact',
                },
                collection: {
                    intro: 'Intro',
                    archive: 'Archive',
                    contact: 'Contact',
                },
                prints: {
                    intro: 'Intro',
                    process: 'Processus',
                    highlights: 'Highlights',
                    inquiry: 'Demande',
                    contact: 'Contact',
                },
                about: {
                    intro: 'Recit',
                    works: 'Oeuvres',
                    contact: 'Contact',
                },
                artwork: {
                    top: 'Oeuvre',
                    inquiry: 'Demande',
                    related: 'Liees',
                    contact: 'Contact',
                },
            },
        },
        artworkTile: {
            collectorPrint: 'Tirage collectionneur',
            viewArtwork: "Voir l'oeuvre",
        },
        categories: {
            Travel: 'Voyage',
            Nature: 'Nature',
            Street: 'Street',
            Wildlife: 'Faune',
            Canvas: 'Toile',
            Instagram: 'Instagram',
            Portrait: 'Portrait',
            Architecture: 'Architecture',
        },
        filters: {
            All: 'Tout',
            'Collector starters': 'Premiers choix',
            'Print-ready': "Pret a l'impression",
            Recent: 'Recent',
        },
        collectionViews: {
            'Best for large walls': {
                label: 'Pour les grands murs',
                description:
                    'Images avec la presence la plus forte en grand format et sur les murs architecturaux.',
            },
            'Collector starters': {
                label: 'Premiers choix',
                description:
                    "Le groupe le plus simple pour commencer une conversation autour d'un tirage.",
            },
            'Quiet interiors': {
                label: 'Interieurs calmes',
                description: 'Oeuvres choisies pour des espaces paisibles, une lumiere plus douce et une atmosphere plus lente.',
            },
            'Black and white': {
                label: 'Noir et blanc',
                description: 'Etudes monochromes avec une forte profondeur tonale et une presentation plus nette.',
            },
            Zurich: {
                label: 'Zurich',
                description: 'Une vue orientee ville pour les acheteurs suisses et les collectionneurs locaux.',
            },
            Romania: {
                label: 'Roumanie',
                description: "Images ancrees dans l'origine, la memoire et l'atmosphere d'Europe de l'Est.",
            },
            'Giftable prints': {
                label: 'Tirages a offrir',
                description: 'Une selection plus douce pour des cadeaux attentionnes et des achats plus modestes.',
            },
            'New work': {
                label: 'Nouveaux travaux',
                description: 'Ajouts plus recents et directions d’image plus fraiches.',
            },
        },
        mainPage: {
            pageTitle: "My Lenses | Photographie d'art par Andrei Pascu",
            heroEyebrow: 'Selection limitee pour collectionneurs',
            heroTitle: 'Une photographie pensee pour des choix plus lents et plus justes.',
            heroDescription:
                "Commencez par une selection plus resserree des oeuvres d'Andrei les plus adaptees au mur, puis passez aux impressions, au placement et a une demande plus privee lorsqu'une image vous semble juste.",
            heroPrimaryCta: 'Explorer les choix collectionneur',
            heroSecondaryCta: "Voir les reperes d'impression",
            stats: {
                collectionLabel: 'Collection',
                collectionDescription:
                    'Oeuvres curiees a travers le voyage, le calme, la vie de rue et l’atmosphere.',
                printReadyLabel: "Pret a l'impression",
                printReadyDescription:
                    'Pieces deja pensees pour le mur, le format, l’atmosphere et la pertinence pour le collectionneur.',
            },
            collectorSelection: {
                eyebrow: 'Selection collectionneur',
                title: "Un point de depart plus resserre vers les oeuvres avec la presence murale la plus nette.",
                description:
                    "Concue pour sembler editee avant de sembler vaste, avec des parcours plus clairs par piece, lieu et intention de collection.",
                action: 'Voir toute la collection',
                routesLabel: 'Points de depart curies',
                collectorFavoriteBadge: 'Favori collectionneur',
            },
            printExperience: {
                eyebrow: "Experience d'impression",
                title: "Les photographies se vendent desormais par l'accord avec la piece, le format et l'atmosphere.",
                description:
                    "La couche impression est cadree pour des demandes privees: toile Giclee archival, conseils de taille plus clairs et une premiere conversation plus reflechie.",
                cards: [
                    {label: 'Materiau', value: 'Toile Giclee archival'},
                    {label: 'Presentation', value: 'Conseils pour cadre ou sans cadre'},
                    {label: 'Processus', value: "Demande directe a l'artiste"},
                ],
                action: 'Entrer sur la page impression',
            },
            artistStory: {
                eyebrow: 'Artiste',
                title:
                    'De la Transylvanie a la Suisse, Andrei photographie le calme, l’atmosphere et la memoire vecue.',
                description:
                    'Le contexte aussi est plus calme: juste assez de recit pour installer la confiance et le gout, sans retirer de place aux images.',
                role: "Photographie d'art et de voyage",
                action: 'Lire le recit',
            },
            printForward: {
                eyebrow: "Oeuvres pour l'impression",
                title: 'Un dernier passage parmi les pieces au potentiel commercial le plus fort.',
                description:
                    'Choisies pour de grands murs, des interieurs plus calmes et des conversations plus assurees autour du tirage.',
                badge: "Pret a l'impression",
            },
            featuredBadge: 'Oeuvre mise en avant',
            newerWorkBadge: 'Travail recent',
        },
        collectionPage: {
            pageTitle: 'Collection | My Lenses',
            eyebrow: 'Collection',
            title: "L'archive complete, avec des points d'entree plus clairs selon les murs, les ambiances et l'intention du collectionneur.",
            description:
                "Commencez par les vues curiees, puis par categorie si vous souhaitez explorer plus largement. Chaque photographie mene maintenant a une page oeuvre dediee avec adequation au tirage, conseils de presentation et chemin de demande directe.",
            action: 'Commencer par les impressions',
            featuredEntryBadge: 'Entree mise en avant',
            curatedRoutesLabel: 'Parcours curies',
            worksLabel: 'oeuvres',
            worksInView: 'oeuvres dans cette vue',
            fallbackDescription:
                "Cliquez sur une photographie pour acceder a une page oeuvre dediee avec adequation au tirage, notes collectionneur et parcours de demande guide.",
        },
        aboutPage: {
            pageTitle: 'A propos | My Lenses',
            eyebrow: 'A propos d’Andrei Pascu',
            title:
                "Un photographe attire par le calme, l'atmosphere et le poids emotionnel des moments ordinaires.",
            paragraphs: [
                "Le langage visuel d'Andrei a commence dans le brouillard, le folklore et les forets de Transylvanie. Cette sensibilite precoce a l'atmosphere traverse encore les oeuvres, qu'elles aient ete realisees en Suisse, a New York, en Roumanie ou sur des cotes plus tranquilles.",
                "Apres des decennies entre sport professionnel, responsabilites et vie menee a travers plusieurs lieux et rythmes, la photographie est devenue le medium qui retenait ce qui disparait autrement trop vite: une lumiere sur un mur, un geste dans la rue, un paysage avant qu'il ne se referme.",
                "Le portfolio presente aujourd'hui ce travail dans un cadre plus mature, non seulement comme des images a faire defiler, mais comme des pieces destinees a vivre dans des pieces et a accompagner les gens dans le temps.",
            ],
            chips: [
                'Base en Suisse',
                "Photographie d'art et de voyage",
                'Demandes collectionneur et interieur',
            ],
            action: 'Entrer dans la collection',
            selectedWorks: {
                eyebrow: 'Oeuvres choisies',
                title: "Une petite coupe de la gamme visuelle derriere le portfolio.",
                description:
                    "Rue, voyage, calme et moments emotionnels plus discrets qui existent au-dela de l'ecran.",
            },
        },
        printsPage: {
            pageTitle: 'Impressions | My Lenses',
            eyebrow: "Consultation impression",
            heroTitle: "Des impressions pensees pour des conversations de collection, pas pour un simple parcours produit.",
            heroDescription:
                "Avec quelques details, vous pouvez construire une demande plus riche autour de l'oeuvre, du format et de l'atmosphere.",
            trustSignals: [
                {label: 'Materiau', value: 'Toile Giclee archival'},
                {label: 'Production', value: 'Realise a la commande, avec consultation'},
                {label: 'Conseil', value: 'Aide pour le format et la presentation'},
                {label: 'Rythme', value: 'Reponse privee sans friction de checkout'},
            ],
            primaryCta: 'Commencer par les pieces majeures',
            secondaryCta: 'Voir toute la collection',
            journey: [
                {
                    step: "1. Reserrer la selection",
                    title: 'Commencer par une selection plus calme.',
                    description:
                        "Faites d'abord place aux photographies qui semblent deja justes pour le mur, l'atmosphere et la presentation.",
                },
                {
                    step: '2. Accorder la piece',
                    title: "Parler d'ambiance, de format et de lumiere.",
                    description:
                        "La conversation sur l'impression quitte les tailles generiques pour aller vers la facon dont l'oeuvre doit reellement vivre dans un espace.",
                },
                {
                    step: '3. Demander en direct',
                    title: 'Passer a une conversation privee.',
                    description:
                        'Pas de theatre marketplace. Juste un meilleur premier message, avec assez de contexte pour obtenir une reponse plus juste.',
                },
            ],
            highlights: {
                eyebrow: "Oeuvres pour l'impression",
                title: "Un point de depart plus fort pour les tirages, les cadeaux et les selections guidees par l'interieur.",
                description:
                    "Ces pieces sont deja cadrees pour soutenir le parcours impression avec format, atmosphere et premieres decisions plus simples.",
                badge: "Pret a l'impression",
            },
            guidedTitle: 'Construire une premiere demande plus solide pour des impressions, des interieurs ou des cadeaux.',
            guidedDescription:
                "Partagez la piece, l'oeuvre ou le type d'accompagnement souhaite afin que la premiere reponse soit plus precise et plus utile.",
        },
        guidedInquiry: {
            defaultEyebrow: 'Demande guidee',
            defaultTitle: "Donner plus de forme a la conversation autour du tirage avant meme la premiere reponse.",
            defaultDescription:
                "Partagez l'oeuvre, la piece et le niveau d'accompagnement souhaite pour que la conversation commence avec plus de clarte.",
            assuranceTitle: 'Ce qui suit ensuite',
            assurancePoints: [
                "Une recommandation plus ciblee selon l'ambiance, le type de piece et la presence murale.",
                "Une discussion claire autour du format probable, de la pertinence du tirage et des prochaines etapes.",
                "Une conversation directe avec l'artiste, sans friction de marketplace ni upsell generique.",
            ],
            chooseIntentTitle: "Choisir l'intention",
            chooseIntentDescription: 'Commencez par le type de conversation que vous souhaitez.',
            addContextTitle: 'Ajouter le contexte de la piece et de l’oeuvre',
            addContextDescription: 'Seulement les details qui rendent la premiere reponse plus adaptee.',
            artworkLabel: 'Oeuvre',
            cityLabel: 'Ville ou pays',
            tempoLabel: 'Rythme de conversation',
            notesLabel: 'Notes',
            summaryLabel: 'Resume de la demande',
            intentLabel: 'Intention',
            settingLabel: 'Cadre',
            locationLabel: 'Lieu',
            artworkPlaceholder: 'Encore indecis',
            cityPlaceholder: 'Zurich, Suisse',
            notesPlaceholder:
                "Decrivez l'ambiance, l'echelle du mur ou ce que vous voulez que l'oeuvre produise dans l'espace.",
            openAction: 'Ouvrir la demande privee',
            emailDirectlyAction: 'Envoyer un courriel',
            directEmailSubject: 'Demande privee',
            curatedRecommendation: 'Recommandation curiee',
            inquiryOptions: {
                printConsultation: {
                    label: "Consultation impression",
                    description: "Aide pour choisir la bonne oeuvre, le bon format et la bonne ambiance pour un espace.",
                },
                artworkAvailability: {
                    label: "Disponibilite de l'oeuvre",
                    description: "Poser une question precise sur une photographie et sur sa possibilite de production.",
                },
                curatedSelection: {
                    label: 'Selection curiee',
                    description: "Recevoir une recommandation plus resserree selon l'atmosphere et l'accord avec la piece.",
                },
                giftGuidance: {
                    label: 'Conseil cadeau',
                    description: 'Commencer par une selection plus calme pour un cadeau marquant.',
                },
                commissionRequest: {
                    label: 'Demande de commande',
                    description: 'Discuter d’une direction plus personnalisee ou d’un brief lie a un projet.',
                },
            },
            roomOptions: {
                livingRoom: 'Salon',
                bedroom: 'Chambre',
                office: 'Bureau',
                hospitality: 'Espace hospitality',
                gift: 'Cadeau',
                stillDeciding: 'Encore indecis',
            },
            budget: {
                customProject: 'Budget projet sur mesure',
                giftGuidance: 'Orientation cadeau',
                openToGuidance: "Ouvert aux conseils",
            },
            timeline: {
                gift: 'Pour un cadeau ou une date particuliere',
                nextMonth: 'Dans le mois a venir',
                exploring: 'Je suis en exploration',
            },
        },
        artworkPage: {
            availabilityFallback: 'Disponible sur demande',
            selectedSizesAvailable: 'Tailles selectionnees disponibles',
            editionFallback: 'Edition ouverte sur demande',
            priceFallback: 'Prix sur demande selon le format',
            startingAround: 'A partir de',
            capturedPrefix: 'Capture',
            labels: {
                suggestedSize: 'Format suggere',
                collectorFit: 'Affinite collectionneur',
                presentation: 'Presentation',
                availability: 'Disponibilite',
                edition: 'Edition',
                bestFormat: 'Meilleur format',
                priceGuidance: 'Repere de prix',
                privateInquiryNotes: 'Notes pour demande privee',
            },
            ctas: {
                askAbout: 'Demander a propos de cette oeuvre',
                printGuidance: "Voir les reperes d'impression",
                originalPost: "Publication d'origine",
                instagram: 'Instagram',
            },
            privateInquiryNotes: [
                "Realise a la commande avec discussion directe autour de la piece, du format et de la presentation.",
                "Sortie sur toile archival concue pour preserver la profondeur tonale et l'atmosphere.",
                'Les conseils avec ou sans cadre peuvent etre adaptes au mur et aux materiaux environnants.',
            ],
            inquiry: {
                eyebrow: "Demande sur l'oeuvre",
                titlePrefix: 'Commencer la conversation autour de',
                description:
                    "Si cette photographie vous parle, utilisez la demande guidee pour rendre la premiere reponse plus precise autour de la piece, du format et de l'intention de collection.",
            },
            related: {
                eyebrow: 'Oeuvres liees',
                title: 'Autres photographies susceptibles de resonner avec la meme intention de collection.',
                description: 'Liees par sujet, lieu, atmosphere ou caractere du tirage.',
            },
        },
        artworkDetails: {
            presentation: {
                portrait: {
                    title: 'Cadre caisse fin ou bord de toile net',
                    note:
                        "Les oeuvres orientees portrait gagnent souvent a respirer un peu plus avec un profil de cadre plus retenu.",
                },
                architecture: {
                    title: 'Cadre caisse noir ou chene naturel',
                    note:
                        "Les images architecturales fonctionnent le mieux avec des aretes plus nettes et un langage de presentation plus epure.",
                },
                nature: {
                    title: 'Cadre chene chaud ou galerie sans cadre',
                    note:
                        "Les images de nature s'ouvrent souvent tres bien lorsque la presentation reste chaleureuse, simple et discrete.",
                },
                fallback: {
                    title: 'Cadre ou sans cadre selon la piece',
                    note:
                        "La bonne presentation depend de l'echelle du mur, des materiaux environnants et du fait que l'espace soit deja calme ou plus graphique.",
                },
            },
            customConsultation: 'Consultation sur mesure',
            sizeNotes: [
                'Un point de depart polyvalent pour la plupart des maisons et des bureaux.',
                "Le meilleur choix quand l'oeuvre a besoin de plus de presence murale ou de recul.",
                'Utilisez les dimensions de la piece et du mur pour ajuster le format final.',
            ],
            priceFromFallback: 'A partir de 140 CHF',
            priceOnRequest: 'Prix sur demande',
        },
        printRecommendations: {
            default: {
                recommendedSize: '50 x 30 cm ou sur mesure',
                bestFit: "Toile Giclee d'art",
                idealSetting: 'Interieurs calmes, studios creatifs et espaces de vie soigneusement composes',
                collectorNote:
                    "Une piece polyvalente concue pour garder atmosphere, detail et presence emotionnelle sur le mur.",
            },
            byCategory: {
                Nature: {
                    recommendedSize: '90 x 60 cm toile statement',
                    bestFit: 'Toile Giclee grand format',
                    idealSetting: 'Salons, lounges et espaces hospitality apaises',
                    collectorNote:
                        "Les paysages s'ouvrent particulierement bien a grande echelle, la ou texture, lumiere et distance peuvent respirer.",
                },
                Travel: {
                    recommendedSize: '90 x 60 cm toile statement',
                    bestFit: 'Toile format galerie ou format sur mesure',
                    idealSetting: 'Habitats ouverts, bureaux et murs d’accent',
                    collectorNote:
                        'Les images de voyage portent un fort sentiment de lieu et deviennent immersives lorsqu’elles sont imprimees avec une presence genereuse.',
                },
                Street: {
                    recommendedSize: '50 x 30 cm toile editoriale',
                    bestFit: 'Toile Giclee format moyen',
                    idealSetting: 'Couloirs, bureaux et interieurs urbains contemporains',
                    collectorNote:
                        'Les photographies de rue sont particulierement fortes comme pieces intimes qui lancent la conversation.',
                },
                Wildlife: {
                    recommendedSize: '50 x 30 cm toile collectionneur',
                    bestFit: 'Toile de qualite museale a forte richesse tonale',
                    idealSetting: 'Coins lecture, bureaux et collections personnelles',
                    collectorNote:
                        "Les images de faune recompensent l'observation de pres, ou geste, calme et detail prennent le dessus.",
                },
                Portrait: {
                    recommendedSize: '50 x 30 cm toile orientee portrait',
                    bestFit: "Toile d'art format moyen",
                    idealSetting: 'Studios, espaces de preparation et interieurs intimes',
                    collectorNote:
                        "Les portraits retiennent mieux l'attention lorsqu'ils conservent assez de format pour porter expression et texture.",
                },
                Architecture: {
                    recommendedSize: '90 x 60 cm toile architecturale',
                    bestFit: 'Toile Giclee grand format',
                    idealSetting: 'Interieurs minimalistes, bureaux et espaces design',
                    collectorNote:
                        "Les compositions architecturales gagnent en force sur le mur par le format, la structure et une presentation nette.",
                },
                Canvas: {
                    recommendedSize: 'Consultation sur mesure',
                    bestFit: 'Apercu toile Giclee',
                    idealSetting: "Ajuste a la piece et a la distance de vision",
                    collectorNote:
                        'Chaque toile peut etre discutee individuellement afin de trouver le bon format, la bonne echelle et le bon emplacement.',
                },
            },
            skylineOrBridge: {
                recommendedSize: '90 x 60 cm toile panoramique',
                idealSetting: 'Salons, bureaux et entrees a forte presence',
            },
            switzerlandNote:
                "Cette piece porte une clarte alpine paisible qui fonctionne tres bien dans des interieurs raffines et lumineux.",
        },
        inquiryEmail: {
            labels: {
                inquiryType: 'Type de demande',
                artwork: 'Oeuvre',
                roomOrSetting: 'Piece ou contexte',
                budgetComfort: 'Aisance budgetaire',
                timeline: 'Delai',
                location: 'Lieu',
                notes: 'Notes',
            },
            fallbacks: {
                stillDeciding: 'Encore indecis',
                openToGuidance: 'Ouvert aux conseils',
                justExploring: 'Je suis en exploration',
            },
            greeting: 'Bonjour Andrei,',
            intro: "J'aimerais discuter d'une oeuvre photographique possible pour mon espace.",
        },
    },
    it: italianMessages,
    ro: romanianMessages,
    hu: hungarianMessages,
} as const;

export type AppCopy = typeof messages.en;
