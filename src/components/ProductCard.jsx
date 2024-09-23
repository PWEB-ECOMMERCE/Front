import { Box, Button, Card, CardMedia, CardContent, Grid, Typography } from "@mui/material";
import CardActions from "@mui/material/CardActions";

export default function ProductCard({ data, hide }) {

  // Função para adicionar produtos ao carrinho e salvar no localStorage
  const handleAddToCart = (product) => {
    const currentCart = localStorage.getItem("cart");
    const cart = currentCart ? JSON.parse(currentCart) : [];
    const doesNotExist = !cart.some(element => element.id === product.id);
    if(doesNotExist){
      const productWithQuantity = { ...product, quant: 1 }; 
      cart.push(productWithQuantity);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  };
  

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
        <Typography mb={1} variant="subtitle2" align="left" component="div" sx={{ color: "button.buttonFlashy" }}>
          {data ? data.categoria.descricao : "Categoria"}
        </Typography>
        <Typography variant="h5" align="left" component="div" color="text.primary">
          {data ? data.nome : "Nome do produto"}
        </Typography>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={8} md={8}>
            <Typography variant="body1" align="left" color="text.secondary">
              {data ? data.descricao : "Descrição do produto"}
            </Typography>
          </Grid>
          {hide ? (
            <Grid item alignSelf={"center"}>
              <Typography style={{ filter: 'blur(8px)', userSelect: 'none' }} variant="h5" align="right" color="text.secondary">
                R$: {data ? data.preco : "100,00"}
              </Typography>
            </Grid>
          ) : (
            <Grid item alignSelf={"center"}>
              <Typography variant="h5" align="right" color="text.secondary">
                R$: {data ? data.preco : "100,00"}
              </Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
      <CardActions sx={{ display: "flex", marginBottom: "4px", justifyContent: "flex-end" }}>
        {!hide && (
          <Button
            onClick={() => handleAddToCart(data)} 
            sx={{ backgroundColor: "button.buttonFlashy", color: "white" }}
            variant="contained"
          >
            Adicionar ao Carrinho
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
