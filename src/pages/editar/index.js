import React, { useState, useEffect } from 'react';
import api from '../../config/api';
import { useParams } from "react-router-dom";

import './index.css';
import { Container, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { Alert, Form, Input, Label } from 'reactstrap';

import { Link } from 'react-router-dom';

const mystyle = {
    textAlign: 'center',
    margin: '30px'
};

export default function Editar() {

    const { _id } = useParams();

    const [status, setStatus] = useState('');

    const [faturamento, setFaturamento] = useState({
        'projeto': '',
        'notaFiscal': '',
        'emissao': '',
        'consultor': '',
        'perfil': '',
        'gestor': '',
        'inicio': '',
        'periodo': '',
        'qtdeHoras': '',
        'valorHoras': '',
        'totalHoras': '',
        'totalImposto': ''
    });

    useEffect(() => {
        async function carregaDados() {
            const dados = await api.get('/listaID/' + _id);
            setFaturamento(dados.data.faturamento);
        };
        carregaDados();
    }, [_id]);

    const editar = async e => {
        e.preventDefault();
        await api.put('/editar/' + _id, faturamento).then(() => {
            setStatus(true);
        });
    };

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            VLZM
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>

            <Container maxWidth="xl" className="formulario">
                { status ? <Alert color="warning">Fatura editada com sucesso.</Alert> : ' ' }
                <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <Label>Proj. Susten.</Label>
                            <Input
                                name="projeto"
                                required
                                id="projeto"
                                label="Proj. Susten."
                                value={faturamento.projeto}
                                onChange={e => setFaturamento({ ...faturamento, [e.target.name]: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Label>Nota Fiscal</Label>
                            <Input
                                name="notaFiscal"
                                type="number"
                                required
                                id="notaFiscal"
                                value={faturamento.notaFiscal}
                                onChange={e => setFaturamento({ ...faturamento, [e.target.name]: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Label>Dt. Emissão</Label>
                            <Input
                                name="emissao"
                                type="date"
                                required
                                id="emissao"
                                value={faturamento.emissao}
                                onChange={e => setFaturamento({ ...faturamento, [e.target.name]: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Label>Consultor</Label>
                            <Input
                                name="consultor"
                                required
                                id="consultor"
                                value={faturamento.consultor}
                                onChange={e => setFaturamento({ ...faturamento, [e.target.name]: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Label>Perfil Prof.</Label>
                            <Input
                                name="perfil"
                                required
                                id="perfil"
                                value={faturamento.perfil}
                                onChange={e => setFaturamento({ ...faturamento, [e.target.name]: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Label>Gestor de TI</Label>
                            <Input
                                name="gestor"
                                required
                                id="gestor"
                                value={faturamento.gestor}
                                onChange={e => setFaturamento({ ...faturamento, [e.target.name]: e.target.value })}
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={2}>
                            <Label>Dt. Inicio/Ativ.</Label>
                            <Input
                                type="date"
                                name="inicio"
                                required
                                id="inicio"
                                value={faturamento.inicio}
                                onChange={e => setFaturamento({ ...faturamento, [e.target.name]: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Label>Período</Label>
                            <Input
                                name="periodo"
                                required
                                id="periodo"
                                value={faturamento.periodo}
                                onChange={e => setFaturamento({ ...faturamento, [e.target.name]: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Label>Qtde/Horas</Label>
                            <Input
                                name="qtdeHoras"
                                required
                                id="qtdeHoras"
                                value={faturamento.qtdeHoras}
                                onChange={e => setFaturamento({ ...faturamento, [e.target.name]: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Label>Valor/Horas</Label>
                            <Input
                                name="valorHoras"
                                required
                                id="valorHoras"
                                value={faturamento.valorHoras}
                                onChange={e => setFaturamento({ ...faturamento, [e.target.name]: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Label>Total/Horas</Label>
                            <Input
                                name="totalHoras"
                                required
                                id="totalHoras"
                                value={faturamento.totalHoras}
                                onChange={e => setFaturamento({ ...faturamento, [e.target.name]: e.target.value })}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Label>Total/Impostos</Label>
                            <Input
                                name="totalImposto"
                                required
                                id="totalImposto"
                                value={faturamento.totalImposto}
                                onChange={e => setFaturamento({ ...faturamento, [e.target.name]: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                    <Grid mt={1} style={mystyle}>
                        <Button variant="contained" color="warning" onClick={editar}>Editar</Button> {' '}
                        <Link to={'/'}>
                            <Button variant="contained" >Voltar</Button>
                        </Link>
                    </Grid>
                </Form>
            </Container>
        </div>
    );
};