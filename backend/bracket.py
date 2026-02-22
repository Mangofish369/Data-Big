"""INDIVIDUAL OCCUPATION INCOME BRACKETS"""
#150k+
wage_high = [
    0,        # Legislative and senior management occupations
    10010,    # Financial managers
    10011,    # Human resources managers
    10019,    # Other administrative services managers
    10029,    # Other business services managers
    11201,     # Professional occupations in business management consulting
    20011,   # Architecture and science managers
    20012,   # Computer and information systems managers
    30010,   # Managers in health care
    4001,    # Managers in public administration
    60010,   # Corporate sales managers
    70010,   # Construction managers
    90010    # Manufacturing managers
    ]
#100 - 150k
wage_up_mid = [
    11100,    # Financial auditors and accountants
    11101,    # Financial and investment analysts
    11102,    # Financial advisors
    11202,     # Advertising, marketing and PR professionals
    21222,   # Information systems specialists
    21232,   # Software developers and programmers
    21300,   # Civil engineers
    21301,   # Mechanical engineers
    21310,   # Electrical and electronics engineers
    21321,   # Industrial and manufacturing engineers
    21399,   # Other professional engineers
    2222,    # Technical occupations in computer & info systems
    22301,   # Mechanical engineering technologists & technicians
    31102,   # General practitioners and family physicians
    31202,   # Physiotherapists
    31209,   # Other professional health occupations
    313,     # Nursing & allied health professionals
    3211,    # Technical dental health care
    412,     # Professional occupations in education
    41200,   # University professors
    41220,   # Secondary school teachers
    41221,   # Elementary school & kindergarten teachers
    41101,   # Lawyers & notaries
    21310,   # Electrical & electronics engineers
    52120    # Graphic designers & illustrators
    ]
#60 - 100k
wage_mid = [
    12010,    # Supervisors, general office/admin support
    131,      # Administrative occupations
    13100,    # Administrative officers
    13111,     # Legal administrative assistants
    22220,   # Computer network & web technicians
    22221,   # User support technicians
    32124,   # Pharmacy technicians
    33102,   # Nurse aides / patient service associates
    33109,   # Other assisting occupations in health support
    42100,   # Police officers
    42101,   # Firefighters
    42202,   # Early childhood educators & assistants
    44100,   # Home child care providers
    44101,   # Home support workers / caregivers
    63100,   # Insurance agents / brokers
    63101,   # Real estate agents & salespersons
    62024,   # Cleaning supervisors
    60030,   # Restaurant & food service managers
    6,       # Sales and service occupations (general management)
    9201,    # "Supervisors, processing and manufacturing occupations"
    920,     # "Supervisors, processing, manufacturing, assembly and fabrication occupations"
    62200,   # Chefs
    62100,   # Technical sales specialists - wholesale trade
    831,     # Occupations in natural resources and fisheries
    6004,    # Managers in customer and personal services
    ]
#<35-60k
wage_low_mid = [14200,    # Accounting and related clerks
    14201,     # Banking, insurance and other financial clerks
    63200,   # Cooks
    63202,   # Bakers
    63210,   # Hairstylists / barbers
    641,     # Retail salespersons & non-technical wholesale trade
    64409,   # Customer & information services representatives
    64410,   # Security guards
    6510,    # Cashiers & other sales support
    65100,   # Cashiers
    65102,   # Store shelf stockers, clerks, order fillers
    65200,   # Food & beverage servers
    65201,   # Food counter attendants / kitchen helpers
    6531,    # Cleaners
    72410,   # Automotive service technicians / mechanics
    72310,   # Carpenters
    7230,    # Plumbers, pipefitters, gas fitters
    72200,   # Electricians
    72106,   # Welders / machine operators
    7201,    # Contractors / supervisors in trades
    7410,    # Mail / message distribution
    74102,   # Couriers / messengers
    75110,   # Construction trades helpers / laborers
    75200,   # Taxi / limo drivers
    942,     # Assemblers / inspectors in manufacturing
    4130,    # Social and community service professionals
    73112,   # Painters and decorators (except interior decorators)
    ]

#<35k
wage_low = [14100,    # General office support workers
    14101,    # Receptionists
    14102,     # Personnel clerks
    14402,   # Production logistics workers
    85110,   # Mine laborers
    73300,   # Transport truck drivers
    73301,   # Bus / subway operators
    95109,    # Other laborers in processing / manufacturing / utilities
    ]

wage_low = [str(code) for code in wage_low]
wage_low_mid = [str(code) for code in wage_low_mid]
wage_mid = [str(code) for code in wage_mid]
wage_up_mid = [str(code) for code in wage_up_mid]
wage_high = [str(code) for code in wage_high]



"""BUSINESS REVENUE BRACKETS"""

# $1,000,000+
rev_very_high = [
    "4011",  # Single Family Housing
    "4021",  # Manufacturing and Light Industrial Building
    "4022",  # Commercial Building
    "4112",  # Gas, Oil and Other Energy Related Structures (Except Pipelines)
    "4113",  # Gas and Oil Pipelines
    "4214",  # Excavating and Grading
    "4219"   # Other Site Work
]

# $200,001 - 1,000,000
rev_high = [
    "0919",  # Other Service Industries Incidental to Crude Petroleum and Natural Gas
    "0711",  # Conventional Crude Oil and Natural Gas Industry
    "3081",  # Machine Shop Industry
    "3192",  # Construction and Mining Machinery and Materials Handling Equipment Industry
    "3199",  # Other Machinery and Equipment Industries n.e.c.
    "4214","4224","4226","4229","4231","4232","4233","4235","4239",  # Trades: Concrete, Carpentry, Masonry, Glass, Roofing, Exterior
    "4241","4261","4272","4274","4275","4276","4278","4279",          # Trades: Plumbing, Electrical, Drywall, Finish, Flooring
    "5219","5319","5511","5639"  # Wholesale: Food, Apparel, Automobiles, Building Materials
]

# $50,000 - 200,000
rev_med = [
    # Agriculture & Farming
    "0112","0119","0139","0141","0171","0211","0219","0311","0411","0511","1099","2499",
    # Printing, Publishing, Repair, Machinery
    "2819","2839","3081","3099","3199","3999",
    # Construction (smaller jobs / renovations)
    "4013","4129","4224","4226","4229","4231","4232","4233","4235","4239","4241","4261","4272","4274","4275","4276","4278","4279",
    "4299","4411","4491","4499",
    # Transportation & Utilities
    "4561","4564","4565","4569","4581","4589","4599","4799","4839","4842","4999",
    # Wholesale / Retail
    "5219","5319","5511","5639","5981","5999",
    "6011","6012","6031","6032","6131","6239","6311","6312","6331","6342","6351","6352","6359","6391","6399","6412","6413","6521","6541","6561","6582","6596","6599","6921",
    # Financial, Real Estate, Insurance, Professional Services
    "7214","7215","7292","7421","7511","7512","7599","7611","7711","7712","7721","7722","7731","7739","7741","7742","7749","7751","7752","7759","7761","7771","7791","7799",
    # Health, Education, Social Services
    "8132","8511","8599","8633","8635","8639","8641","8649","8651","8652","8653","8654","8661","8665","8666","8669","8671","8699","8629",
    # Hospitality & Food Services
    "9111","9114","9211","9212","9213","9214",
    # Entertainment, Recreation, Personal Services
    "9611","9631","9639","9641","9659","9699","9711","9712","9713","9726","9741","9799",
    # Organizations & Associations
    "9811","9821","9839","9841","9851","9861",
    # Other services
    "9931","9942","9949","9953","9959","9999","2542","5799","7499","9962"
]