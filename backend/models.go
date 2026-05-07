package main
type Portfolio struct {
	Name         string   `json:"name"`
	Title        string   `json:"title"`
	Summary      string   `json:"summary"`
	Education    string   `json:"education"`
	Skills       []string `json:"skills"`
	StrongPoints []struct {
		Point       string `json:"point"`
		Description string `json:"description"`
	} `json:"strongPoints"`
	Contact struct {
		Email  string `json:"email"`
		Github string `json:"github"`
	} `json:"contact"`
}