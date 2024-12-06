import './Project.scss'
import CardList from "../../organisms/List/CardList";
import {useTranslation} from "react-i18next";

export default function Project() {
    const {t} = useTranslation();
    const data = [
        {
            title: t('projects.ems.name'),
            body: t('projects.ems.body'),
            image: 'ems.jpg',
            link: 'https://exam-management-system-z76m.onrender.com/graphql',
            github: 'https://github.com/locnguyen2k2/exam-management-system/',
            tags: ['nestjs', 'mongodb', 'graphql', 'typescript']
        },
        {
            title: t('projects.lms.name'),
            body: t('projects.lms.body'),
            github: 'https://github.com/locnguyen2k2/laboratory-management-system',
            link: 'https://laboratory-management-system.onrender.com/apis',
            image: 'labs.jpg',
            tags: ['nestjs', 'mysql', 'swagger']
        },
        {
            title: t('projects.lmsApp.name'),
            body: t('projects.lmsApp.body'),
            github: 'https://github.com/locnguyen2k2/laboratory-management-application',
            image: 'labs-app.jpg',
            tags: ['react-native', 'axios'],
        },
        {
            title: t('projects.hiCoffeePos.name'),
            body: t('projects.hiCoffeePos.body'),
            image: 'hicoffee-management.jpg',
            link: '',
            github: 'https://github.com/locnguyen2k2/hi-coffee-management-system',
            tags: ['core-php', 'mvc', 'axios', 'bootstrap5', 'html', 'css', 'javascript'],
        },
        {
            title: t('projects.hiCoffeeApp.name'),
            body: t('projects.hiCoffeeApp.body'),
            github: 'https://github.com/locnguyen2k2/hi-coffee-order-application',
            link: '',
            image: 'hicoffee-mobile.jpg',
            tags: ['react-native', 'axios']
        }
    ]

    return (
        <>
            <div className={'project'}>
                <CardList title={'My projects'} data={data}/>
            </div>
        </>
    )
}