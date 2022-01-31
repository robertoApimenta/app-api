import React, { useState, useEffect } from 'react';
import api from '../../config/api';

import './index.css';
import { Container, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Alert, Form, Input, Label } from 'reactstrap';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

const mystyle = {
    textAlign: 'center',
    margin: '30px'
};


export default function Index() {

    const [status, setStatus] = useState(false);

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
    })

    const [tabela, setTabela] = useState([]);

    useEffect(() => {
        const lista = async () => {
            await api.get('/lista').then((res) => {
                setTabela(res.data)
            }).catch((erro) => {
                setStatus('erro');
            });
        }
        lista();
    }, [setTabela]);

    function limpaInputs() {
        document.getElementById("projeto").value = "";
        document.getElementById("notaFiscal").value = "";
        document.getElementById("emissao").value = "";
        document.getElementById("consultor").value = "";
        document.getElementById("perfil").value = "";
        document.getElementById("gestor").value = "";
        document.getElementById("inicio").value = "";
        document.getElementById("periodo").value = "";
        document.getElementById("qtdeHoras").value = "";
        document.getElementById("valorHoras").value = "";
        document.getElementById("totalHoras").value = "";
        document.getElementById("totalImposto").value = "";
    };

    const salvar = async e => {
        e.preventDefault();
        const resultado = await api.post('/novo', faturamento);
        if (!resultado.data.erro) {
            await api.get('/lista').then((res) => {
                setTabela(res.data);
                setStatus(true);
                limpaInputs();
            }).catch((erro) => {
                setStatus('erro');
            });
        } else {
            setStatus('erro');
        }
    };

    const deletar = async (id) => {
        await api.delete('/deletar/' + id);
        await api.get('/lista').then((res) => {
            setTabela(res.data);
            limpaInputs();
        }).catch((erro) => {
            setStatus('erro');
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
                {status === 'erro' ? <Alert color="warning">Preencha todos os campos.</Alert> : ''}
                {status === true ? <Alert color="success">Cadastrado com sucesso.</Alert> : ''}
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
                                value={faturamento.totalHoras = faturamento.qtdeHoras*faturamento.valorHoras}
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
                        <Button variant="contained" onClick={salvar}>Salvar</Button>
                    </Grid>
                </Form>
                <hr></hr>
                <Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Proj. Susten.</TableCell>
                                    <TableCell align="center">Nota Fiscal</TableCell>
                                    <TableCell align="center">Dt. Emissão</TableCell>
                                    <TableCell align="center">Consultor</TableCell>
                                    <TableCell align="center">Perfil Prof.</TableCell>
                                    <TableCell align="center">Gestor de TI</TableCell>
                                    <TableCell align="center">Dt. Início/Ativ.</TableCell>
                                    <TableCell align="center">Período</TableCell>
                                    <TableCell align="center">Qtde/Horas</TableCell>
                                    <TableCell align="center">Valor/Hora</TableCell>
                                    <TableCell align="center">Total/Horas</TableCell>
                                    <TableCell align="center">Total/Impostos</TableCell>
                                    <TableCell align="center">Opções</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tabela.map((row) => (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.projeto}
                                        </TableCell>
                                        <TableCell align="center">{row.notaFiscal}</TableCell>
                                        <TableCell align="center">{row.emissao}</TableCell>
                                        <TableCell align="center">{row.consultor}</TableCell>
                                        <TableCell align="center">{row.perfil}</TableCell>
                                        <TableCell align="center">{row.gestor}</TableCell>
                                        <TableCell align="center">{row.inicio}</TableCell>
                                        <TableCell align="center">{row.periodo}</TableCell>
                                        <TableCell align="center">{row.qtdeHoras}</TableCell>
                                        <TableCell align="center">{row.valorHoras}</TableCell>
                                        <TableCell align="center">{row.totalHoras}</TableCell>
                                        <TableCell align="center">{row.totalImposto}</TableCell>
                                        <TableCell align="center">
                                            <Link to={"/editar/" + row._id}>
                                                <EditIcon
                                                    sx={{ color: 'gold' }}
                                                />
                                            </Link>
                                            <Button>
                                                <DeleteForeverIcon
                                                    onClick={() => deletar(row._id)}
                                                    sx={{ color: 'red' }}
                                                />
                                            </Button>{' '}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Container>
        </div >
    );
};