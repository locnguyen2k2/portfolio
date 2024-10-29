import './Project.scss'
import CardList from "../../organisms/List/CardList";

const data = [
    {
        title: 'Exam paper management system',
        body: 'The system was developed following GraphQL and is used to manage questions, answers, users, authentication, permission, classes, lessons, and chapters,  as well as for creating or automatically generating exam papers.',
        image: 'ems.jpg',
        link: 'https://exam-management-system-z76m.onrender.com/graphql',
        github: 'https://github.com/locnguyen2k2/exam-management-system/',
        tags: ['nestjs', 'mongodb', 'graphql', 'typescript']
    },
    {
        title: 'Laboratory management system',
        body: 'A RESTful API system have been designed to boring, returning or transferring items from rooms and management equipment, tools, chemicals, rooms, users.',
        github: 'https://github.com/locnguyen2k2/laboratory-management-system',
        link: 'https://laboratory-management-system.onrender.com/apis',
        image: 'labs.jpg',
        tags: ['nestjs', 'mysql', 'swagger']
    },
    {
        title: 'Laboratory borrowing application',
        body: 'The application is used to manage information and support borrowing the items (android only) for the Laboratory management system',
        github: 'https://github.com/locnguyen2k2/laboratory-management-application',
        image: 'labs-app.jpg',
        tags: ['react-native', 'axios'],
    },
    {
        title: 'Hi-Coffee management system',
        body: 'The POS system for Fnb (not included raw materials management) used to manage products, categories, areas, tables, users, permission, ordering, cash payment, invoices and statistics',
        image: 'hicoffee-management.jpg',
        link: '',
        github: 'https://github.com/locnguyen2k2/hi-coffee-management-system',
        tags: ['core-php', 'mvc', 'axios', 'bootstrap5', 'html', 'css', 'javascript'],
    },
    {
        title: 'Hi-Coffee ordering application',
        body: 'The order application is build for staffs to help customers ordering products at shop(by Hi-Coffee APIs).',
        github: 'https://github.com/locnguyen2k2/hi-coffee-order-application',
        link: '',
        image: 'hicoffee-mobile.jpg',
        tags: ['react-native', 'axios']
    }
]


export default function Project() {

    return (
        <>
            <div className={'project'}>
                <CardList title={'My projects'} data={data}/>
            </div>
        </>
    )
}