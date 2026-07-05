import { Monster } from '../services/monsterService';

interface MonsterCardProps {
    monster: Monster;
    onEdit?: (monster: Monster) => void;
    onDelete?: (index: string) => void;
}

export default function MonsterCard({ monster, onEdit, onDelete }: MonsterCardProps) {
    return (
        <div className="monster-card" style={{ border: '1px solid #ccc', padding: '1.5rem', borderRadius: '8px', width: '300px', margin: '1rem 0' }}>
            <h2 className="monster-name">{monster.name}</h2>
            <p><strong>Tipo:</strong> {monster.type} ({monster.size})</p>
            <p><strong>Vida (HP):</strong> {monster.hit_points}</p>
            
            {monster.isCustom && (
                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => onEdit?.(monster)} style={{ cursor: 'pointer' }}>
                        Editar
                    </button>
                    <button onClick={() => onDelete?.(monster.index)} style={{ cursor: 'pointer', color: 'red' }}>
                        Deletar
                    </button>
                </div>
            )}
        </div>
    );
}