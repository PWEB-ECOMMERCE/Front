import { Box, Button, Card, CardMedia, CardContent, Grid, Typography } from "@mui/material"
import CardActions from "@mui/material/CardActions"

export default function ProductCard({ data, hide }) {

  const handleAddToCart = (data) => {
    const currentCart = localStorage.getItem("cart");
    const cart = currentCart ? JSON.parse(currentCart) : [];
    cart.push(data);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
  }

  const localStorageCartProducts = JSON.parse(localStorage.
    getItem('cartProducts'))
  let cartProduct = localStorage.
    getItem('cartProducts') !== null ? localStorageCartProducts : []

  const updateLocalStorage = () => {
    localStorage.setItem('cartProduct', JSON.stringify(cartProduct))
  }

  return (
    <Card>
      <CardMedia
        component="img"
        height="248"
        image={data ? data.foto : "products.png"}
        alt={data ? data.descricao : "product"}
        title={data ? data.nome : "Nome do Produto"}
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
        <Typography mb={1} variant="subtitle2" align="left" component="div" sx={{ color: "button.buttonFlashy" }}>{data ? data.categoria.descricao : "Categoria"}</Typography>
        <Typography variant="h5" align="left" component="div" color="text.primary">{data ? data.nome : "Nome do produto"}</Typography>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={8} md={8}>
            <Typography variant="body1" align="left" color="text.secondary">
              {data ? data.descricao : "Description long long long long long long long long long long long long long long long long"}
            </Typography>
          </Grid>
          {hide ?
            <Grid item alignSelf={"center"}>
              <Typography style={{ filter: 'blur(8px)', userSelect: 'none' }} variant="h5" align="right" color="text.secondary">
                R$: {data ? data.preco : "100,00"}
              </Typography>
            </Grid>
            :
            <Grid item alignSelf={"center"}>
              <Typography variant="h5" align="right" color="text.secondary">
                R$: {data ? data.preco : "100,00"}
              </Typography>
            </Grid>
          }
        </Grid>
      </CardContent>
      <CardActions sx={{ display: "flex", marginBottom: "4px", justifyContent: "flex-end" }}>
        {hide
          ?
          ""
          :
          <Button onClick={() => { localStorageCartProducts }} sx={{ backgroundColor: "button.buttonFlashy", color: "white" }} variant="contained">Adicionar ao Carrinho</Button>
        }
      </CardActions>
    </Card>
  )

}
