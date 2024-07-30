import { Box,Button, Card, CardMedia, CardContent, Grid, Typography } from "@mui/material"
import CardActions from "@mui/material/CardActions"

export default function ProductCard({data}) {
  return (
    <Card>
      <CardMedia
        component="img"
        height="248"
        image="products.png"
        alt="product"
        title="Nome do Produto"
        sx={{objectFit:"contain"}}
      />
      <CardContent>
        <Typography mb={1} variant="subtitle2" align="left" component="div" sx={{color:"button.buttonFlashy"}}>{data?data.cat:"Categoria"}</Typography>
        <Typography variant="h5" align="left" component="div" color="text.primary">{data?data.cat:"Nome do produto"}</Typography>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={8} md={8}>
            <Typography variant="body1" align="left" color="text.secondary">
            {data?data.desc:"Description long long long long long long long long long long long long long long long long"}
            </Typography>
          </Grid>
          <Grid item alignSelf={"center"}>
            <Typography variant="h5" align="right" color="text.secondary">
            R$: {data?data.price:"100,00"}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions sx={{display:"flex",marginBottom:"4px", justifyContent:"flex-end"}}>
          <Button sx={{backgroundColor:"button.buttonFlashy", color:"white"}}variant="contained">Adicionar ao Carrinho</Button>
      </CardActions>
    </Card>
  )

}
