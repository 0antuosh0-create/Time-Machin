/** A voice overheard on arrival — keyed to each era id. */
export const QUOTES: Record<string, { line: string; who: string }> = {
  egypt: {
    line: "The river rises, the river falls, and the scribe writes it all down before he forgets.",
    who: "A temple accountant, Memphis",
  },
  rome: {
    line: "Beware the Ides of March — though frankly, beware most days in this city.",
    who: "A soothsayer, near the Forum",
  },
  persia: {
    line: "Snow, rain, heat, or the gloom of night — none of these stays our couriers from their appointed rounds.",
    who: "An inscription on the Royal Road",
  },
  fall: {
    line: "The Empire did not end today. It simply stopped sending letters.",
    who: "A magistrate, Ravenna",
  },
  magna: {
    line: "No free man shall be seized, save by the lawful judgment of his equals.",
    who: "Clause 39, as read aloud at Runnymede",
  },
  medieval: {
    line: "We build the cathedral for the grandchildren of men not yet born.",
    who: "A master mason, Île de la Cité",
  },
  plague: {
    line: "Do not open the door. Do not welcome the sailors. It is already too late.",
    who: "A harbourmaster, Messina",
  },
  press: {
    line: "What one scribe copied in a year, this machine will print in a morning.",
    who: "An apprentice, Mainz",
  },
  renaissance: {
    line: "The painter's mind should be like a mirror, taking the colour of all it sees.",
    who: "Overheard in a bottega, Firenze",
  },
  principia: {
    line: "If I have seen further, it is by standing on the shoulders of giants.",
    who: "A fellow of the Royal Society",
  },
  revolution: {
    line: "Liberty, equality, fraternity — and bread, if there is any left.",
    who: "A pamphleteer, Palais-Royal",
  },
  expo: {
    line: "They called my tower a monstrosity. Come, ride the lift and say it again.",
    who: "An engineer, Champ de Mars",
  },
  einstein: {
    line: "A storm broke loose in my mind. Suddenly time itself was suspect.",
    who: "A patent clerk, Bern, recalling the moment it clicked",
  },
  greatwar: {
    line: "The lamps are going out all over Europe; we shall not see them lit again in our lifetime.",
    who: "A diplomat, London, August",
  },
  reichstag: {
    line: "Where they burn books, they will in the end also burn people.",
    who: "Heinrich Heine, 1821 — engraved at this square today",
  },
  worldwar2: {
    line: "You ask what is our aim? It is victory — victory at all costs, for without victory there is no survival.",
    who: "A new prime minister, London, 1940 — a year from now",
  },
  atomic: {
    line: "Now I am become Death, the destroyer of worlds.",
    who: "A physicist, watching the desert dawn",
  },
  space: {
    line: "The stars don't look any closer from up here. But everything else looks smaller.",
    who: "A cosmonaut, low Earth orbit",
  },
  moon: {
    line: "That's one small step for man, one giant leap for mankind.",
    who: "The Sea of Tranquility",
  },
  wall: {
    line: "The gates are open. The guards just… let us through. Come, bring a hammer.",
    who: "A crowd at Bornholmer Straße",
  },
  home: {
    line: "Everyone keeps saying 'these are strange times'. They say it every single year. It's the times that never listen.",
    who: "Someone in a group chat, 2026",
  },
  near: {
    line: "The sea didn't ask permission. We just had to be smarter than the tide.",
    who: "A barrier engineer, Greater Rotterdam",
  },
  mid: {
    line: "I was born looking up at a river that curves across the sky. I didn't know that was unusual until I was twelve.",
    who: "A child on O'Neill Station Kepler",
  },
  deep: {
    line: "We kept every receipt, every lullaby, every angry letter never sent. The archive doesn't judge — it just remembers.",
    who: "A custodian, the Long Archive, Lagrange point 2",
  },
};

/** One line of practical advice for surviving each era. */
export const SURVIVAL: Record<string, { pack: string; avoid: string; blend: string }> = {
  egypt: {
    pack: "Linen, sandals, and a healthy respect for cats.",
    avoid: "Insulting a scribe. They write the history.",
    blend: "Offer bread and beer. It's basically currency.",
  },
  rome: {
    pack: "A toga, coins, and a bodyguard for mid-March.",
    avoid: "Standing near ambitious senators with cloaks.",
    blend: "Complain loudly about the traffic and the grain price.",
  },
  persia: {
    pack: "A decent horse and a gift for somebody important.",
    avoid: "Blocking the Royal Road when the royal courier is coming.",
    blend: "Praise the qanat water. Everyone agrees it's excellent.",
  },
  fall: {
    pack: "Warm cloaks — the roads and the empire are crumbling.",
    avoid: "Asking who's in charge. Nobody's quite sure.",
    blend: "Admire the mosaics. Everyone does; they're new.",
  },
  magna: {
    pack: "Sturdy boots for a very damp meadow.",
    avoid: "Taking the king's side. Read the room.",
    blend: "Nod gravely whenever anyone says 'liberties'.",
  },
  medieval: {
    pack: "A cloak, a candle, and passable Latin.",
    avoid: "Drinking the river. Drink the small beer.",
    blend: "Cross yourself at bells and never mention potatoes.",
  },
  plague: {
    pack: "Nothing. Do not disembark. This is a flyover.",
    avoid: "Crowds, ports, rats, and optimism.",
    blend: "Keep your distance — a habit six centuries early.",
  },
  press: {
    pack: "Ink-proof gloves and a book to have copied cheaply.",
    avoid: "Betting against the printing machine.",
    blend: "Marvel at how the letters are all identical.",
  },
  renaissance: {
    pack: "A florin or two and an eye for genius.",
    avoid: "Critiquing anyone named Leonardo or Michelangelo.",
    blend: "Have strong, loud opinions about art. It's the sport.",
  },
  principia: {
    pack: "A warm coat and a notebook for the stars.",
    avoid: "Mentioning alchemy to Mr. Newton. Touchy subject.",
    blend: "Say 'quite so' and gesture at the heavens.",
  },
  revolution: {
    pack: "A tricolour cockade and a low profile.",
    avoid: "Powdered wigs, aristocratic vowels, and speeches.",
    blend: "Cheer for liberty. Cheer loudly. Keep cheering.",
  },
  expo: {
    pack: "A parasol, a few centimes, and wonder.",
    avoid: "Calling the tower ugly. Eiffel is listening.",
    blend: "Queue for the lift and gasp at the electric lights.",
  },
  einstein: {
    pack: "A notebook. He filled his with the entire universe.",
    avoid: "Asking the clerk at desk four for career advice. He's stuck too.",
    blend: "Argue about physics in a café until two in the morning.",
  },
  greatwar: {
    pack: "A steel helmet and a letter home, just in case.",
    avoid: "Standing tall above the parapet. Ever.",
    blend: "Share your cigarettes; it buys goodwill in the mud.",
  },
  reichstag: {
    pack: "Nothing. There is nothing to bring here. Only attention.",
    avoid: "The comfortable belief that you would have noticed in time.",
    blend: "You cannot, and you should not want to. Watch how it was done.",
  },
  worldwar2: {
    pack: "Nothing decorative, nothing loud, papers for everything.",
    avoid: "Drawing any attention to yourself, ever. This year is watching.",
    blend: "Keep your head down and your ration book ready.",
  },
  atomic: {
    pack: "Dark goggles and a great deal of distance.",
    avoid: "Looking directly at 05:29 in the desert.",
    blend: "Speak softly. The whole world just changed.",
  },
  space: {
    pack: "A skinny tie, a transistor radio, and optimism.",
    avoid: "Betting against the Moon landing. It's coming.",
    blend: "Watch the launch on TV with the whole neighbourhood.",
  },
  moon: {
    pack: "A pressure suit — the atmosphere is, notably, absent.",
    avoid: "Sudden movements. Gravity is one-sixth here.",
    blend: "Bounce, don't walk. Everyone does.",
  },
  wall: {
    pack: "A warm coat, a camera, and a hammer.",
    avoid: "Missing the moment. It only opens once.",
    blend: "Climb up, chip off a souvenir, hug a stranger.",
  },
  home: {
    pack: "You already brought everything. It's in your pocket.",
    avoid: "Doomscrolling the news about eras you could visit instead.",
    blend: "Impossible. Everyone knows you. Wave at your neighbour.",
  },
  near: {
    pack: "Biometric ID, a UV-rated jacket, and low expectations for coffee.",
    avoid: "Driving manually — it's illegal and you'll be pulled over instantly.",
    blend: "Complain about the sea wall construction noise. Everyone else does.",
  },
  mid: {
    pack: "A pressure tolerance certificate and your entire genome on file.",
    avoid: "Calling it 'fake gravity'. The residents are sensitive about this.",
    blend: "Look up. If the river across the sky doesn't impress you, pretend.",
  },
  deep: {
    pack: "An open mind. Your biology, language, and manners are all antiques.",
    avoid: "Asking 'What do people do all day?' They'll answer, and you won't understand.",
    blend: "Visit the Long Archive. Find your own records. They kept everything.",
  },
};
