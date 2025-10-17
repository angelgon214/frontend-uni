import { useState } from 'react'
import { UserCheck, AlertCircle } from 'lucide-react'
import './App.css'

export default function RegistroVisitante() {
    const [formulario, setFormulario] = useState({
        nombre: '',
        motivo: '',
        dia: '',
        mes: '',
        fecha: ''
    });

    const [registrados, setRegistrados] = useState([]);
    const [error, setError] = useState('');
    const [exito, setExito] = useState('');

    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const dias = Array.from({ length: 31 }, (_, i) => i + 1);
    const motivos = ['Reunión', 'Informes', 'Entrevista', 'Evento', 'Visita Guiada', 'Otro'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormulario({ ...formulario, [name]: value });
    };

    const validarFormulario = () => {
        setError('');

        if (!formulario.nombre.trim()) {
            setError('El nombre es requerido');
            return false;
        }

        if (!formulario.motivo) {
            setError('Debe seleccionar un motivo de visita');
            return false;
        }

        if (!formulario.dia || !formulario.mes) {
            setError('Debe seleccionar día y mes');
            return false;
        }

        return true;
    };

    const registro = () => {
        if (!validarFormulario()) return;

        const fechaCompleta = `${formulario.dia} de ${meses[parseInt(formulario.mes) - 1]}`;
        setRegistrados([
            ...registrados,
            { ...formulario, fecha: fechaCompleta, id: Date.now() }
        ]);

        setExito(`¡Bienvenido ${formulario.nombre}!`);
        setFormulario({ nombre: '', motivo: '', dia: '', mes: '', fecha: '' });

        setTimeout(() => setExito(''), 3000);
    };

    const handleEliminar = (id) => {
        setRegistrados(registrados.filter(r => r.id !== id));
    };

    return (
        <div className="container">
            <div className="logo-container">
                <img src="uteq_logo.png" alt="Logo" className="logo-img" />
            </div>
            <h1 className="header-title">Registro de Visitantes UTEQ</h1>
            <p className="header-subtitle">Sistema de Control de Acceso</p>
            <div className="grid-container">
                <div className="card">
                    <h2 className="card-title">Registrar Visitante</h2>
                    {error && (
                        <div className="alert alert-error">
                            <AlertCircle className="alert-icon" />
                            <p>{error}</p>
                        </div>
                    )}
                    {exito && (
                        <div className="alert alert-success">
                            <UserCheck className="alert-icon" />
                            <p>{exito}</p>
                        </div>
                    )}
                    <div className="form-group">
                        <label className="form-label">Nombre Completo</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formulario.nombre}
                            onChange={handleChange}
                            placeholder="Nombre de visitante"
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Motivo de Visita</label>
                        <select
                            name="motivo"
                            value={formulario.motivo}
                            onChange={handleChange}
                            className="form-select"
                        >
                            <option value="">Selecciona un motivo</option>
                            {motivos.map(m => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>
                    <div className="date-grid">
                        <div>
                            <label className="form-label">Día</label>
                            <select
                                name="dia"
                                value={formulario.dia}
                                onChange={handleChange}
                                className="form-select"
                            >
                                <option value="">Día</option>
                                {dias.map(d => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="form-label">Mes</label>
                            <select
                                name="mes"
                                value={formulario.mes}
                                onChange={handleChange}
                                className="form-select"
                            >
                                <option value="">Mes</option>
                                {meses.map((m, i) => (
                                    <option key={m} value={i + 1}>{m}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button onClick={registro} className="btn-register">
                        Registrar Visitante
                    </button>
                </div>
                <div className="card">
                    <h2 className="card-title">Visitantes Registrados ({registrados.length})</h2>
                    <div className="list-container">
                        {registrados.length === 0 ? (
                            <p className="empty-message">No hay registros aún</p>
                        ) : (
                            registrados.map(visitante => (
                                <div key={visitante.id} className="list-item">
                                    <div className="list-item-content">
                                        <p>{visitante.nombre}</p>
                                        <p>Motivo: {visitante.motivo}</p>
                                        <p>Fecha: {visitante.fecha}</p>
                                    </div>
                                    <button onClick={() => handleEliminar(visitante.id)} className="btn-delete">
                                        Eliminar
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
