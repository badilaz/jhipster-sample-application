package com.zadilab.bpmf.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * The Customer entity.
 */
@ApiModel(description = "The Customer entity.")
@Entity
@Table(name = "customer")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * The firstname attribute.
     */
    @ApiModelProperty(value = "The firstname attribute.")
    @Column(name = "name")
    private String name;

    @Column(name = "piva")
    private String piva;

    @Column(name = "cod_fisc")
    private String codFisc;

    @ManyToOne
    @JsonIgnoreProperties(value = "customers", allowSetters = true)
    private Location location;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Customer name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPiva() {
        return piva;
    }

    public Customer piva(String piva) {
        this.piva = piva;
        return this;
    }

    public void setPiva(String piva) {
        this.piva = piva;
    }

    public String getCodFisc() {
        return codFisc;
    }

    public Customer codFisc(String codFisc) {
        this.codFisc = codFisc;
        return this;
    }

    public void setCodFisc(String codFisc) {
        this.codFisc = codFisc;
    }

    public Location getLocation() {
        return location;
    }

    public Customer location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Customer)) {
            return false;
        }
        return id != null && id.equals(((Customer) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Customer{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", piva='" + getPiva() + "'" +
            ", codFisc='" + getCodFisc() + "'" +
            "}";
    }
}
