import { useState, useEffect } from 'react';
import { Monster } from '../services/monsterService';

interface MonsterFormProps {
    monsterParaEditar: Monster | null;
    onSalvar: (monster: Omit<Monster, 'index'> & { index?: string }) => void;
    onCancelar: () => void;
}

export default function MonsterForm({ monsterParaEditar, onSalvar, onCancelar }: MonsterFormProps) {
    const [name, setName] = useState('');
    const [size, setSize] = useState('Medium');
    const [type, setType] = useState('Humanoid');
    const [hitPoints, setHitPoints] = useState(10);

    useEffect(() => {
        if (monsterParaEditar) {
            setName(monsterParaEditar.name);
            setSize(monsterParaEditar.size);
            setType(monsterParaEditar.type);
            setHitPoints(monsterParaEditar.hit_points);
        } else {
            setName('');
            setSize('Medium');
            setType('Humanoid');
            setHitPoints(10);
        }
    }, [monsterParaEditar]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSalvar({
            index: monsterParaEditar?.index,
            name,
            size,
            type,
            hit_points: Number(hitPoints)
        });
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '300px', border: '1px solid #aaa', padding: '1rem', borderRadius: '8px' }}>
            <h3>{monsterParaEditar ? 'Editar Monstro' : 'Criar Novo Monstro'}</h3>
            
            <label>Nome:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

            <label>Tamanho:</label>
            <input type="text" value={size} onChange={(e) => setSize(e.target.value)} required />

            <label>Tipo:</label>
            <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />

            <label>Vida (HP):</label>
            <input type="number" value={hitPoints} onChange={(e) => setHitPoints(Number(e.target.value))} required />

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button type="submit">Salvar</button>
                <button type="button" onClick={onCancelar}>Cancelar</button>
            </div>
        </form>
    );
}