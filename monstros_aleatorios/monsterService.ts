export interface Monster {
    index: string;
    name: string;
    size: string;
    type: string;
    hit_points: number;
    isCustom?: boolean;
}

const LOCAL_KEY = 'meus_monstros';

export const monsterService = {
    async fetchApiList() {
        const response = await fetch("https://www.dnd5eapi.co/api/2014/monsters");
        const data = await response.json();
        return data.results;
    },

    async fetchApiMonster(index: string) {
        const response = await fetch(`https://www.dnd5eapi.co/api/2014/monsters/${index}`);
        return await response.json();
    },

    getMonster(): Monster[] {
        if (typeof window === 'undefined') return [];
        const dados = localStorage.getItem(LOCAL_KEY);
        return dados ? JSON.parse(dados) : [];
    },

    saveMonster(monster: Omit<Monster, 'index'> & { index?: string }) {
        const monstros = this.getMonster();
        
        if (monster.index) {
            const idx = monstros.findIndex(m => m.index === monster.index);
            if (idx !== -1) {
                monstros[idx] = { ...monster, index: monster.index, isCustom: true } as Monster;
            }
        } else {
            const novoMonstro: Monster = {
                ...monster,
                index: `custom-${Date.now()}`,
                isCustom: true
            };
            monstros.push(novoMonstro);
        }
        
        localStorage.setItem(LOCAL_KEY, JSON.stringify(monstros));
        return monstros;
    },

    deleteMonster(index: string) {
        const monstros = this.getMonster();
        const filtrados = monstros.filter(m => m.index !== index);
        localStorage.setItem(LOCAL_KEY, JSON.stringify(filtrados));
        return filtrados;
    }
};