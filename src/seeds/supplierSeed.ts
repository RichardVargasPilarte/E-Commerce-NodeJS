import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Supplier from '@models/supplier';

dotenv.config();

const suppliers = [
    {
        "name": "Acme Innovations Inc.", "contact_name": "John Smith",
        "email": "john.smith@acmeinnovations.com",
        "phone": "1-212-555-0100",
        "address": "123 Main Street, New York, NY",
        "company": "Acme Innovations Inc.",
        "country": "EEUU",
        "website": "acmeinnovations.com",
        "notes": "Leading provider of cutting-edge tech solutions."
    },
    {
        "name": "Global Supplies Ltd.",
        "contact_name": "Eleanor Vance",
        "email": "eleanor.vance@globalsupplies.co.uk",
        "phone": "44-20-7946-0123",
        "address": "789 High Street, London, SW1A 0AA",
        "company": "Global Supplies Ltd.",
        "country": "UK",
        "website": "globalsupplies.co.uk",
        "notes": "Wholesale distributor of industrial equipment."
    },
    {
        "name": "Servicios Digitales Avanzados S.L.",
        "contact_name": "Pablo Ruiz",
        "email": "pablo.ruiz@serviciosdigitales.es",
        "phone": "34-91-123-4567",
        "address": "Calle Gran Vía 15, 28013 Madrid",
        "company": "Servicios Digitales Avanzados S.L.",
        "country": "España",
        "website": "serviciosdigitales.es",
        "notes": "Expertos en marketing digital y desarrollo web."
    },
    {
        "name": "Inversiones del Plata S.A.",
        "contact_name": "Martín Sosa",
        "email": "martin.sosa@inversionesdelplata.com.ar",
        "phone": "54-11-4000-0101",
        "address": "Av. Corrientes 800, C1043AAO Buenos Aires",
        "company": "Inversiones del Plata S.A.",
        "country": "Argentina",
        "website": "inversionesdelplata.com.ar",
        "notes": "Compañía de inversiones y consultoría financiera."
    },
    {
        "name": "Tech Solutions GmbH",
        "contact_name": "Lena Müller",
        "email": "lena.muller@techsolutions.de",
        "phone": "49-30-9876-5432",
        "address": "Hauptstraße 1, 10115 Berlin",
        "company": "Tech Solutions GmbH",
        "country": "Alemania",
        "website": "techsolutions.de",
        "notes": "Desarrollo de software a medida para la industria 4.0."
    },
    {
        "name": "Orient Express Trading",
        "contact_name": "Chen Li",
        "email": "chen.li@orientexpress.cn",
        "phone": "86-10-8765-4321",
        "address": "Chaoyang District, Beijing",
        "company": "Orient Express Trading Co. Ltd.",
        "country": "China",
        "website": "orientexpress.cn",
        "notes": "Comercio internacional de productos manufacturados."
    },
    {
        "name": "Nordic Innovators AS",
        "contact_name": "Ingrid Olsen",
        "email": "ingrid.olsen@nordicinnovators.no",
        "phone": "47-22-111-222",
        "address": "Karl Johans gate 1, 0159 Oslo",
        "company": "Nordic Innovators AS",
        "country": "Noruega",
        "website": "nordicinnovators.no",
        "notes": "Innovación en energías renovables y sostenibilidad."
    },
    {
        "name": "Australasian Solutions Pty Ltd",
        "contact_name": "Liam Gallagher",
        "email": "liam.gallagher@australasiansolutions.au",
        "phone": "61-2-9000-1111",
        "address": "Pitt Street, Sydney NSW 2000",
        "company": "Australasian Solutions Pty Ltd",
        "country": "Australia",
        "website": "australasiansolutions.au",
        "notes": "Consultoría y servicios de TI en la región Asia-Pacífico."
    },
    {
        "name": "African Resources Ltd.",
        "contact_name": "Zola Mkhize",
        "email": "zola.mkhize@africanresources.za",
        "phone": "27-11-234-5678",
        "address": "Sandton City, Johannesburg",
        "company": "African Resources Ltd.",
        "country": "Sudáfrica",
        "website": "africanresources.za",
        "notes": "Suministro de materias primas y logística."
    },
    {
        "name": "Étoile Services",
        "contact_name": "Antoine Dubois",
        "email": "antoine.dubois@etoileservices.fr",
        "phone": "33-1-45-67-89-01",
        "address": "Avenue des Champs-Élysées, 75008 Paris",
        "company": "Étoile Services S.A.R.L.",
        "country": "Francia",
        "website": "etoileservices.fr",
        "notes": "Servicios de consultoría y gestión de proyectos."
    }
]
const seedSuppliers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('🟢 MongoDB connected');

        await Supplier.deleteMany(); // Clean the collection
        await Supplier.insertMany(suppliers); // Insert new data

        console.log('✅ Suppliers successfully seeded');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding suppliers:', error);
        process.exit(1);
    }
};

seedSuppliers();
