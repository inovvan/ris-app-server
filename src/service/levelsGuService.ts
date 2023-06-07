import { LevelGu } from "../entities/LevelGu"
import { River } from "../entities/River"
import { AppDataSource } from "../data-source"
import { hydronodesData } from "./levelsGuData"

const LevelsGuRepository = AppDataSource.getRepository(LevelGu)
const RiverRepository = AppDataSource.getRepository(River)

export const getAll = async () => {
    let levels = await LevelsGuRepository.find({
      relations: {
        river: true,
      },
    });
    let levelsDto: any[] = [];
    levels.map(async (level) => {
        levelsDto.push(
            {
                ...level,
                river: level.river.name
            }
        )
    })
    return levelsDto;
  };

  export const add = async (level) => {
    let newLevel = new LevelGu();
    let date = new Date(level.date);
    let levelsExist = await LevelsGuRepository.find(
        {
            where: {
                date: date
            },
            relations: {
                river: true,
            },
        }
    );
    if (levelsExist.find((levelExist) => levelExist.hydronode === level.hydronode)) return undefined;
    const river = await RiverRepository.findOneBy({ name: level.river });
    newLevel = {
        ...level,
        river: river
    }

    return LevelsGuRepository.save(newLevel);
}

export const change = async (level) => {
    let levelGu = new LevelGu();
    const river = await RiverRepository.findOneBy({ name: level.river });
    levelGu = {
        ...level,
        river: river,
    };
    return LevelsGuRepository.update(levelGu.id, levelGu);
}

export const deleteById = async (id) => {
    return LevelsGuRepository.delete(id); 
}

export const getLevelsByDate = async (date) => {
    let hydronodes = hydronodesData;

    let levels = await LevelsGuRepository.find(
        {
            relations: {
                river: true,
            },
        }
    ); 

    hydronodes = hydronodes.map((hydronode) => {
        let todayLevel = levels.find((level) => (level.hydronode === hydronode.hydronode && date.toLocaleString().slice(0, 10) === level.date.toLocaleString().slice(0, 10)));
        if (todayLevel !== undefined) {
            hydronode.level1 = todayLevel.level1;
            hydronode.level1 = todayLevel.level2;
            hydronode.date = todayLevel.date.toLocaleString().slice(0, 10);
        }
        return hydronode;
      })

    return hydronodes;
}

export const getAllByHydronode = async (hydronode) => {
    let levels = await LevelsGuRepository.find(
        {
            where: {
                hydronode: hydronode
            },
            relations: {
                river: true,
            },
        }
    ); 
    let levelsDto: any = [];
    levels.map(async (level) => {
        levelsDto.push(
            {
                ...level,
                river: level.river.name
            }
        )
    })
    return levelsDto;
}