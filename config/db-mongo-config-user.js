//Lineas para Crear Rol en MongoDB
db.createRole(
    {
        role:"rolAdmin",
        privileges:[
            {
                resource:{db:"xp_siscomedor",collection:""},
                actions:["changeStream","collStats","convertToCapped","createCollection","dbHash","dbStats","dropCollection","createIndex","dropIndex","find","insert","killCursors","listIndexes","listCollections","remove","renameCollectionSameDB","update"]
            }
        ],
        roles:[]
    }
    );

//Linea para Crear Usuario con Rol anterior
db.createUser(
    {
        user:"xipe",
        pwd:passwordPrompt(),
        roles:[
            {role:"rolAdmin",db:"xp_siscomedor"}
        ]
    }
);