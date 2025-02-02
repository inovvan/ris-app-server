import { Notice } from "../entities/Notice"
import { Site } from "../entities/Site"
import { AppDataSource } from "../data-source"
import { Between } from 'typeorm';

const NoticeRepository = AppDataSource.getRepository(Notice)
const SiteRepository = AppDataSource.getRepository(Site)

export const getAll = async () => {
    let notices = await NoticeRepository
    .createQueryBuilder('notice')
    .leftJoinAndSelect('notice.site', 'site')
    .leftJoinAndSelect(`site.river`, 'river')
    .getMany();

    notices.sort((a, b) => {
        return (b.date.getTime() - a.date.getTime())
    })

    let noticesDto: any[] = [];
    notices.forEach(async (notice) => {
        noticesDto.push(
            {
                ...notice,
                site: notice.site.name,
                river: notice.site.river.name
            }
        )
    })
    
    return noticesDto;
  };

  export const getAllBySite = async (siteName) => {
    let site = await SiteRepository.findOneBy({ name: siteName });
    
    if (site === null) return;
    const notices = await NoticeRepository
    .createQueryBuilder('notice')
    .leftJoinAndSelect('notice.site', 'site')
    .leftJoinAndSelect(`site.river`, 'river')
    .where(`site.id = :id`, { id: site.id })
    .getMany();

    let noticesDto: any[] = [];
    notices.map(async (notice) => {
        noticesDto.push(
            {
                ...notice,
                site: notice.site.name,
                river: notice.site.river.name
            }
        )
    })

    return noticesDto;
  };

  export const getAllByDate = async (date) => {
    const currentDate = new Date(date);  
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);
    let notices = await NoticeRepository.find(
        {
            where: {
                date: Between(startDate, endDate)
            },
            relations: [
                'site',
                'site.river'
            ],
        }
    ); 

    let noticesDto: any[] = [];
    notices.map(async (notice) => {
        noticesDto.push(
            {
                ...notice,
                site: notice.site.name,
                river: notice.site.river.name
            }
        )
    })
    return noticesDto;
}

export const getAllByPeriod = async (startPeriod, endPeriod) => {
    const startPeriodDate = new Date(startPeriod);  
    const endPeriodDate = new Date(endPeriod);
    const startDate = new Date(startPeriodDate.getFullYear(), startPeriodDate.getMonth(), startPeriodDate.getDate(), 0, 0, 0);
    const endDate = new Date(endPeriodDate.getFullYear(), endPeriodDate.getMonth(), endPeriodDate.getDate(), 23, 59, 59);
    let notices = await NoticeRepository.find(
        {
            where: {
                date: Between(startDate, endDate)
            },
            relations: [
                'site',
                'site.river'
            ],
        }
    ); 

    let noticesDto: any[] = [];
    notices.map(async (notice) => {
        noticesDto.push(
            {
                ...notice,
                site: notice.site.name,
                river: notice.site.river.name
            }
        )
    })
    return noticesDto;
}

export const add = async (notice) => {
    let newNotice = new Notice();
    const site = await SiteRepository.findOneBy({ name: notice.site });
    newNotice = {
        ...notice,
        site: site,
        date: new Date(notice.date)
    }
    return NoticeRepository.save(newNotice);
}

export const change = async (notice) => {
    let updatedNotice = new Notice();
    const site = await SiteRepository.findOne({ 
        where: {
            name: notice.site
        }
    });
    console.log(site);
    updatedNotice = {
        ...notice,
        site: site,
        date: new Date(notice.date),
    };
    return NoticeRepository.save(updatedNotice);
}

export const deleteById = async (id) => {
    return NoticeRepository.delete( { id: id } ); 
}