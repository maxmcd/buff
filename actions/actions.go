package actions

import (
	"net/http"

	"github.com/gobuffalo/buffalo"
)

func IndexHandler(c buffalo.Context) error {
	c.Set("user", struct{ Username string }{Username: "max"})
	return c.Render(http.StatusOK, r.HTML("index.plush.html"))
}

func LoginHandler(c buffalo.Context) error {
	c.Data()["user"] = struct{ Username string }{Username: "max"}

	return c.Render(http.StatusOK, r.HTML("login.plush.html"))
}
