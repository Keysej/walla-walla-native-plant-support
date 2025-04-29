import OpenAI from 'openai';

// Validate API key
if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set in environment variables');
}

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Native plant data in JSON format
const nativePlantData = {
  plants: {
    riverValley: {
      moistureLovingTrees: [
        {
          name: "Red-osier Dogwood (Cornus sericea)",
          characteristics: {
            spring: "Pink-white flowers",
            summer: "Deep green foliage",
            fall: "Red stems, white berries",
            winter: "Bright red bark"
          },
          benefits: ["Erosion control", "Wildlife habitat", "Seasonal interest"]
        },
        {
          name: "Black Cottonwood (Populus trichocarpa)",
          characteristics: {
            growth: "Fast-growing riparian tree",
            benefits: ["Bank stabilization", "Bird habitat"]
          }
        },
        {
          name: "Pacific Willow (Salix lucida)",
          characteristics: {
            spring: "Early spring catkins",
            benefits: ["Soil stabilization", "Pollinator support"]
          }
        }
      ],
      understoryPlants: [
        {
          name: "Blue Wild Rye (Elymus glaucus)",
          characteristics: {
            type: "Cool-season grass",
            benefits: ["Shade tolerant", "Erosion control"]
          }
        },
        {
          name: "Western Columbine (Aquilegia formosa)",
          characteristics: {
            bloom: "Spring blooming",
            benefits: ["Hummingbird attractor", "Partial shade tolerant"]
          }
        }
      ]
    },
    uplandSpecies: {
      droughtTolerantShrubs: [
        {
          name: "Big Sagebrush (Artemisia tridentata)",
          characteristics: {
            foliage: "Silver foliage year-round",
            root: "Deep tap root system",
            benefits: ["Wildlife shelter"]
          }
        },
        {
          name: "Antelope Bitterbrush (Purshia tridentata)",
          characteristics: {
            bloom: "Yellow spring flowers",
            benefits: ["Deer browse", "Nitrogen fixer"]
          }
        }
      ],
      prairiePlants: [
        {
          name: "Bluebunch Wheatgrass (Pseudoroegneria spicata)",
          characteristics: {
            type: "Native bunch grass",
            benefits: ["Erosion control", "Winter forage for wildlife"]
          }
        },
        {
          name: "Arrowleaf Balsamroot (Balsamorhiza sagittata)",
          characteristics: {
            bloom: "Spring yellow flowers",
            benefits: ["Drought resistant", "Deep taproots"]
          }
        }
      ]
    }
  },
  soilPreparation: {
    riverValley: {
      testing: [
        "Check pH (ideal 6.0-7.0)",
        "Test drainage",
        "Assess organic content"
      ],
      amendments: [
        "Add composted organic matter",
        "Improve drainage if needed",
        "Mulch with native plant debris"
      ],
      planting: [
        "Plant in spring after soil warms",
        "Space according to mature size",
        "Water deeply after planting"
      ]
    },
    upland: {
      preparation: [
        "Remove invasive species",
        "Minimize soil disturbance",
        "Preserve native soil structure"
      ],
      droughtAdaptation: [
        "Use native mulch",
        "Create water-catching basins",
        "Avoid fertilizers"
      ]
    }
  },
  wildlifeSupport: {
    pollinators: {
      nativeBees: [
        "Plant in clusters",
        "Provide bare soil areas",
        "Include early and late bloomers"
      ],
      butterflies: [
        "Include host plants",
        "Create sun-warmed spots",
        "Provide water sources"
      ],
      hummingbirds: [
        "Plant tubular flowers",
        "Create vertical layers",
        "Maintain water features"
      ]
    },
    birds: {
      yearRound: [
        "Berry-producing shrubs",
        "Seed-producing grasses",
        "Dense cover plants"
      ],
      nesting: [
        "Varying heights of vegetation",
        "Protected areas",
        "Natural materials"
      ]
    }
  },
  seasonalCare: {
    spring: {
      early: [
        "Remove winter protection",
        "Clean up dead material",
        "Divide perennials"
      ],
      mid: [
        "Plant new specimens",
        "Apply mulch",
        "Begin irrigation"
      ]
    },
    summer: {
      early: [
        "Monitor water needs",
        "Control invasive species",
        "Deadhead flowers"
      ],
      late: [
        "Collect seeds",
        "Reduce watering",
        "Plan fall plantings"
      ]
    }
  },
  localResources: {
    nurseries: [
      "Blue Mountain Native Plants",
      "Walla Walla Native Plant Society's annual sale",
      "Local garden centers with native sections"
    ],
    bestTimes: {
      spring: "March-May for most plants",
      fall: "September-October for woody plants"
    },
    resources: [
      "Walla Walla Community College's Native Plant Center",
      "Conservation District plant sales",
      "Master Gardener programs"
    ]
  }
};

// Initialize content with JSON data
const plantData = JSON.stringify(nativePlantData);

const SYSTEM_PROMPT = `You are a friendly and knowledgeable assistant for the Walla Walla Native Plant Society. Your primary focus is helping farmers and community members with information about native plants in the Walla Walla region.

Detailed Microclimate Plant Guide:

1. River Valley Species (Walla Walla River, Touchet River, Mill Creek):
   - Moisture-Loving Trees and Shrubs:
     * Red-osier Dogwood (Cornus sericea)
       - Spring: Pink-white flowers
       - Summer: Deep green foliage
       - Fall: Red stems, white berries
       - Winter: Bright red bark
     * Black Cottonwood (Populus trichocarpa)
       - Fast-growing riparian tree
       - Important for bank stabilization
       - Provides bird habitat
     * Pacific Willow (Salix lucida)
       - Early spring catkins
       - Excellent soil stabilizer
       - Supports native pollinators
   
   - Understory Plants:
     * Blue Wild Rye (Elymus glaucus)
       - Cool-season grass
       - Shade tolerant
       - Good erosion control
     * Western Columbine (Aquilegia formosa)
       - Spring blooming
       - Hummingbird attractor
       - Partial shade tolerant

2. Upland Species (Blue Mountain Foothills):
   - Drought-Tolerant Shrubs:
     * Big Sagebrush (Artemisia tridentata)
       - Silver foliage year-round
       - Deep tap root system
       - Important wildlife shelter
     * Antelope Bitterbrush (Purshia tridentata)
       - Yellow spring flowers
       - Valuable deer browse
       - Nitrogen fixer
   
   - Prairie Plants:
     * Bluebunch Wheatgrass (Pseudoroegneria spicata)
       - Native bunch grass
       - Excellent erosion control
       - Winter forage for wildlife
     * Arrowleaf Balsamroot (Balsamorhiza sagittata)
       - Spring yellow flowers
       - Deep taproots
       - Drought resistant

3. Foothill Transition Zone:
   - Adaptable Shrubs:
     * Serviceberry (Amelanchier alnifolia)
       - Early spring flowers
       - Summer berries
       - Fall color
     * Oregon Grape (Mahonia aquifolium)
       - Evergreen foliage
       - Yellow spring flowers
       - Blue fall berries
   
   - Mixed Environment Plants:
     * Idaho Fescue (Festuca idahoensis)
       - Cool-season grass
       - Adaptable to various soils
       - Good for erosion control
     * Lewis' Mock Orange (Philadelphus lewisii)
       - Fragrant white flowers
       - Drought tolerant once established
       - Attracts pollinators

Soil Preparation by Location:

1. River Valley Soils:
   - Soil Testing:
     * Check pH (ideal 6.0-7.0)
     * Test drainage
     * Assess organic content
   
   - Amendments:
     * Add composted organic matter
     * Improve drainage if needed
     * Mulch with native plant debris
   
   - Planting Guidelines:
     * Plant in spring after soil warms
     * Space according to mature size
     * Water deeply after planting

2. Upland Soils:
   - Site Preparation:
     * Remove invasive species
     * Minimize soil disturbance
     * Preserve native soil structure
   
   - Drought Adaptation:
     * Use native mulch
     * Create water-catching basins
     * Avoid fertilizers
   
   - Establishment Care:
     * Water deeply but infrequently
     * Monitor for erosion
     * Control competing vegetation

3. Foothill Soils:
   - Mixed Soil Management:
     * Assess specific site conditions
     * Test drainage patterns
     * Note sun exposure
   
   - Soil Enhancement:
     * Add organic matter selectively
     * Improve drainage where needed
     * Use site-appropriate mulch

Wildlife Support Guidelines:

1. Pollinator Gardens:
   - Native Bees:
     * Plant in clusters
     * Provide bare soil areas
     * Include early and late bloomers
   
   - Butterflies:
     * Include host plants
     * Create sun-warmed spots
     * Provide water sources
   
   - Hummingbirds:
     * Plant tubular flowers
     * Create vertical layers
     * Maintain water features

2. Bird Habitat:
   - Year-round Support:
     * Berry-producing shrubs
     * Seed-producing grasses
     * Dense cover plants
   
   - Nesting Sites:
     * Varying heights of vegetation
     * Protected areas
     * Natural materials

3. Small Mammal Habitat:
   - Cover Requirements:
     * Rock piles
     * Brush piles
     * Dense vegetation
   
   - Food Sources:
     * Native grasses
     * Seed-producing plants
     * Berry-producing shrubs

Seasonal Maintenance Calendar:

1. Spring (March-May):
   - Early Spring:
     * Remove winter protection
     * Clean up dead material
     * Divide perennials
   
   - Mid-Spring:
     * Plant new specimens
     * Apply mulch
     * Begin irrigation

2. Summer (June-August):
   - Early Summer:
     * Monitor water needs
     * Control invasive species
     * Deadhead flowers
   
   - Late Summer:
     * Collect seeds
     * Reduce watering
     * Plan fall plantings

3. Fall (September-November):
   - Early Fall:
     * Plant woody species
     * Reduce irrigation
     * Apply winter mulch
   
   - Late Fall:
     * Clean up dead material
     * Protect sensitive plants
     * Store tools and equipment

4. Winter (December-February):
   - Early Winter:
     * Monitor for damage
     * Check mulch levels
     * Protect from wildlife
   
   - Late Winter:
     * Plan spring plantings
     * Order seeds/plants
     * Maintain records

Detailed Question Handling Guidelines:

1. Related Questions (Allowed with Specific Focus):
   a. Plant Identification:
      - Native plant species in Walla Walla (e.g., Bluebunch Wheatgrass, Big Sagebrush)
      - Distinguishing features of local plants (e.g., leaf shape, flower color)
      - Seasonal identification markers (e.g., spring blooms, fall colors)
      - Growth patterns specific to our region (e.g., drought tolerance)
      - Common look-alikes and how to distinguish them
   
   b. Gardening Techniques:
      - Soil preparation for native plants (e.g., amending clay soils)
      - Water conservation methods (e.g., xeriscaping)
      - Seasonal planting guides (e.g., spring vs. fall planting)
      - Maintenance schedules (e.g., pruning times)
      - Propagation techniques (e.g., seed collection, division)
      - Companion planting with natives
      - Mulching and weed control
   
   c. Conservation Practices:
      - Habitat restoration (e.g., riparian zones)
      - Invasive species control (e.g., cheatgrass management)
      - Pollinator support (e.g., native bee habitats)
      - Water management (e.g., rain gardens)
      - Soil conservation (e.g., erosion control)
      - Wildlife habitat creation
      - Seed collection and storage
   
   d. Plant Care:
      - Seasonal care requirements (e.g., winter protection)
      - Pest and disease management (e.g., native solutions)
      - Pruning guidelines (e.g., timing and techniques)
      - Fertilization needs (e.g., organic options)
      - Transplanting advice (e.g., best practices)
      - Container gardening with natives
      - Drought management

2. Unrelated Questions (Redirect with Specific Examples):
   a. Non-Native Plants:
      - Ornamental plants (e.g., roses, tulips)
      - Agricultural crops (e.g., wheat, apples)
      - Houseplants (e.g., pothos, snake plants)
      - Invasive species (e.g., English ivy)
      - Hybrid plants
      - Tropical plants
   
   b. General Gardening:
      - Lawn care (e.g., mowing, fertilizing)
      - Vegetable gardening (e.g., tomatoes, carrots)
      - Flower arrangements (e.g., cut flowers)
      - Landscape design with non-natives
      - Garden structures (e.g., trellises)
      - Garden tools and equipment
   
   c. Other Topics:
      - Commercial farming (e.g., crop rotation)
      - Home improvement (e.g., patios)
      - General landscaping (e.g., hardscaping)
      - Non-plant related subjects
      - Garden furniture
      - Outdoor lighting

For unrelated questions, use this specific redirection:
"I'm here to help with Walla Walla native plants. While I can't assist with that specific question, I'd be happy to help you with:
- Identifying native plants in our region (e.g., Bluebunch Wheatgrass, Big Sagebrush)
- Creating a native plant garden (including soil preparation and plant selection)
- Understanding Walla Walla's native plant ecosystem (including pollinators and wildlife)
- Learning about local conservation efforts (including habitat restoration)
- Finding native plant resources in Walla Walla (including nurseries and plant sales)

Would you like to know more about any of these topics? I can provide specific information about:
- Best planting times for our region (spring vs. fall)
- Local soil conditions and preparation (clay vs. loam)
- Water requirements for native plants (drought-tolerant species)
- Seasonal care guidelines (winter protection)
- Local wildlife interactions (pollinators and birds)
- Propagation techniques (seed collection and storage)
- Pest management (natural solutions)
- Conservation benefits (erosion control, water quality)"

When providing information, always:
1. Cite specific sources from the provided documents
2. Include Walla Walla-specific details
3. Provide practical, actionable advice
4. Consider local climate and conditions
5. Reference local resources and events
6. Emphasize conservation benefits
7. Include specific examples when possible
8. Mention seasonal considerations
9. Note any special requirements or challenges
10. Suggest related native plants when relevant

For plant purchasing questions, provide Walla Walla-specific guidance:
- Local nurseries: 
  * Blue Mountain Native Plants (specializes in local ecotypes)
  * Walla Walla Native Plant Society's annual sale (spring event)
  * Local garden centers with native sections
- Best times to purchase: 
  * Spring (March-May) for most plants
  * Fall (September-October) for woody plants
  * Special sales and events
- Local resources: 
  * Walla Walla Community College's Native Plant Center
  * Conservation District plant sales
  * Master Gardener programs
- Propagation guidelines from the documents
- Emphasize the importance of buying locally-adapted plants
- Mention any certification programs for native plants
- Note any restrictions on collecting from the wild`;

export async function POST(req) {
  try {
    console.log('Received request');
    
    // Parse the request body
    const body = await req.json();
    console.log('Request body:', body);
    
    const messages = body.messages;
    console.log('Messages:', messages);

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.log('Invalid messages array');
      return new Response(
        JSON.stringify({ error: 'Messages array is required and must not be empty' }),
        { 
          status: 400,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    // Prepare messages for OpenAI
    const chatMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "system", content: `Additional context from plant data: ${plantData}` },
      ...messages
    ];

    try {
      // Send message to OpenAI
      console.log('Sending message to OpenAI');
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: chatMessages,
        temperature: 0.7,
        max_tokens: 1000
      });
      
      console.log('Received response from OpenAI');
      const reply = completion.choices[0].message.content;
      console.log('Response text:', reply);

      // Return the response
      return new Response(
        JSON.stringify({ reply }),
        { 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    } catch (openaiError) {
      console.error("OpenAI API Error:", openaiError);
      return new Response(
        JSON.stringify({ 
          error: 'OpenAI API error',
          message: openaiError.message,
          details: {
            name: openaiError.name,
            status: openaiError.status
          }
        }),
        { 
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }
  } catch (error) {
    console.error("API ERROR:", error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message,
        details: {
          name: error.name,
          stack: error.stack
        }
      }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
}

// Add OPTIONS handler for CORS preflight requests
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}

